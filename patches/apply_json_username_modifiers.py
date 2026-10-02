#!/usr/bin/env python3
"""Insert RouteHash JSON /config username_modifiers support into iohzrd datum_api.c."""
from pathlib import Path
import sys

api = Path(sys.argv[1] if len(sys.argv) > 1 else "src/datum_api.c")
inc = Path(sys.argv[2] if len(sys.argv) > 2 else "json_username_modifiers.c")
text = api.read_text()
helper = inc.read_text()
if "datum_api_config_post_json" in text:
    print("json username_modifiers already applied")
    sys.exit(0)

anchor = """int datum_api_config_post(struct MHD_Connection * const connection, char * const post, const int len) {
	struct MHD_Response *response;
	int ret;
	const char *key;
	json_t *j_it;
	
	if (!datum_config.api_modify_conf) {
		return datum_api_do_error(connection, MHD_HTTP_FORBIDDEN);
	}
	
	json_t * const j = json_object();
"""
if anchor not in text:
    raise SystemExit("datum_api_config_post anchor not found; pin mismatch")

replacement = helper.rstrip() + """

int datum_api_config_post(struct MHD_Connection * const connection, char * const post, const int len) {
	struct MHD_Response *response;
	int ret;
	const char *key;
	json_t *j_it;
	
	if (!datum_config.api_modify_conf) {
		return datum_api_do_error(connection, MHD_HTTP_FORBIDDEN);
	}

	if (post && len > 0 && post[0] == '{') {
		return datum_api_config_post_json(connection, post, len);
	}
	
	json_t * const j = json_object();
"""
api.write_text(text.replace(anchor, replacement, 1))
print("applied json username_modifiers to", api)
