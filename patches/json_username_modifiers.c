/* JSON POST /config for stratum.username_modifiers (operator dest splits).
 * Inserted into iohzrd datum_api.c at pin 7491a50. Browser form POSTs are unchanged.
 * RouteHash's marketplace does not POST this gateway.
 */
static int datum_api_json_reply(struct MHD_Connection * const connection, const unsigned int status, const char * const body) {
	struct MHD_Response * const response = MHD_create_response_from_buffer(strlen(body), (void *)body, MHD_RESPMEM_MUST_COPY);
	if (!response) {
		return MHD_NO;
	}
	MHD_add_response_header(response, "Content-Type", "application/json");
	return datum_api_submit_uncached_response(connection, status, response);
}

static int datum_api_config_post_json(struct MHD_Connection * const connection, char * const post, const int len) {
	json_error_t error;
	json_t * const root = json_loadb(post, (size_t)len, 0, &error);
	if (!root || !json_is_object(root)) {
		if (root) json_decref(root);
		return datum_api_json_reply(connection, MHD_HTTP_BAD_REQUEST, "{\"error\":\"invalid json\"}");
	}

	if (!datum_api_check_admin_password(connection, root, datum_api_create_empty_mhd_response)) {
		json_decref(root);
		return MHD_YES;
	}

	json_t *stratum = json_object_get(root, "stratum");
	json_t *mods = json_is_object(stratum) ? json_object_get(stratum, "username_modifiers") : json_object_get(root, "username_modifiers");
	if (!mods) {
		json_t *reply = json_object();
		json_object_set_new(reply, "ok", json_true());
		if (datum_config.config_json) {
			json_t *cfg_stratum = json_object_get(datum_config.config_json, "stratum");
			json_t *existing = json_is_object(cfg_stratum) ? json_object_get(cfg_stratum, "username_modifiers") : NULL;
			if (json_is_object(existing)) {
				json_t *out_stratum = json_object();
				json_object_set(out_stratum, "username_modifiers", existing);
				json_object_set_new(reply, "stratum", out_stratum);
			}
		}
		char *body = json_dumps(reply, JSON_COMPACT);
		json_decref(reply);
		json_decref(root);
		if (!body) {
			return datum_api_json_reply(connection, MHD_HTTP_INTERNAL_SERVER_ERROR, "{\"error\":\"encode failed\"}");
		}
		int rc = datum_api_json_reply(connection, MHD_HTTP_OK, body);
		free(body);
		return rc;
	}
	if (!json_is_object(mods)) {
		json_decref(root);
		return datum_api_json_reply(connection, MHD_HTTP_BAD_REQUEST, "{\"error\":\"username_modifiers must be an object\"}");
	}

	json_t *merged = json_object();
	if (datum_config.config_json) {
		json_t *cfg_stratum = json_object_get(datum_config.config_json, "stratum");
		json_t *existing = json_is_object(cfg_stratum) ? json_object_get(cfg_stratum, "username_modifiers") : NULL;
		if (json_is_object(existing)) {
			json_decref(merged);
			merged = json_deep_copy(existing);
			if (!merged) merged = json_object();
		}
	}

	const char *gname;
	json_t *gval;
	json_object_foreach(mods, gname, gval) {
		if (json_is_null(gval) || (json_is_object(gval) && json_object_size(gval) == 0)) {
			json_object_del(merged, gname);
		} else if (json_is_object(gval)) {
			json_object_set(merged, gname, gval);
		} else {
			json_decref(merged);
			json_decref(root);
			return datum_api_json_reply(connection, MHD_HTTP_BAD_REQUEST, "{\"error\":\"modifier group must be an object of address:fraction\"}");
		}
	}

	struct datum_username_mod *parsed = NULL;
	if (datum_config_parse_username_mods(&parsed, merged, true) < 0) {
		json_decref(merged);
		json_decref(root);
		return datum_api_json_reply(connection, MHD_HTTP_BAD_REQUEST, "{\"error\":\"invalid username_modifiers\"}");
	}

	void * const old = datum_config.stratum_username_mod;
	datum_config.stratum_username_mod = parsed;
	free(old);

	if (datum_config.config_json) {
		datum_api_json_modify_new("stratum", "username_modifiers", json_incref(merged));
		if (!datum_api_json_write()) {
			json_decref(merged);
			json_decref(root);
			return datum_api_json_reply(connection, MHD_HTTP_INTERNAL_SERVER_ERROR, "{\"error\":\"failed to write config file\"}");
		}
	}

	DLOG_INFO("API updated stratum.username_modifiers (%u groups)", (unsigned)json_object_size(merged));
	json_decref(merged);
	json_decref(root);
	return datum_api_json_reply(connection, MHD_HTTP_OK, "{\"ok\":true}");
}

