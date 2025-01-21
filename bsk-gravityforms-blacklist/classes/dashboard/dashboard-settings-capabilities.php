<?php

class BSK_GFBLCV_Dashboard_Settings_Capabilities {
	
	public function __construct() {
	}
	
	
	function show_settings( $plugin_settings ){
		
		$capability_settings = array();
		if( $plugin_settings && is_array( $plugin_settings ) && count( $plugin_settings ) > 0 ){
			if( isset( $plugin_settings['capability_settings'] ) ) {
				$capability_settings = $plugin_settings['capability_settings'];
			}
		}

		$enable_editor_checked = '';
		$editor_disable_class = ' bsk-gfbl-td-disabled-capability';
		$editor_do_settings_chk_disabled = ' disabled';
		if ( isset( $capability_settings['editor'] ) && $capability_settings['editor'] ) {
			$enable_editor_checked = ' checked';
			$editor_disable_class = '';
			if ( current_user_can( 'manage_options' ) ) {
				$editor_do_settings_chk_disabled = '';
			}
		}

		$enable_author_checked = '';
		$author_disable_class = ' bsk-gfbl-td-disabled-capability';
		$author_blocked_data_view_chk_disabled = ' disabled';
		if ( isset( $capability_settings['author'] ) && $capability_settings['author'] ) {
			$enable_author_checked = ' checked';
			$author_disable_class = '';
			if ( current_user_can( 'bsk_gfbl_do_settings' ) ) {
				$author_blocked_data_view_chk_disabled = '';
			}
		}

		$enable_contributor_checked = '';
		$contributor_disable_class = ' bsk-gfbl-td-disabled-capability';
		if ( isset( $capability_settings['contributor'] ) && $capability_settings['contributor'] ) {
			$enable_contributor_checked = ' checked';
			$contributor_disable_class = '';
		}

		$editor_capabilities = get_role( 'editor' )->capabilities;
		$author_capabilities = get_role( 'author' )->capabilities;
		$contributor_capabilities = get_role( 'contributor' )->capabilities;

		$action_url = admin_url( 'admin.php?page='.BSK_GFBLCV_Dashboard::$_bsk_gfblcv_pages['settings'] );
	?>
	<h3><?php esc_html_e( 'Backend Access Settings by Role', 'bskgfbl' ); ?></h3>
    <form action="<?php echo add_query_arg( 'target', 'capabilities', $action_url ); ?>" method="POST" id="bsk_gfbl_capabilities_settings_form_ID">
    <div class="bsk-gfbl-backend-access-settings-by-role">
		<div class="bsk-gfblcv-tips-box">
            <p>This feature only available Pro version</p>
            <p>To buy a license, please <a href="<?php echo BSK_GFBLCV::$_plugin_home_url; ?>" target="_blank">click here >></a></p>
        </div>
		<p><?php esc_html_e( 'By default, only Administrator users can access all menu items and do everyting. Check the checkbox before the Role name to enable all users in the role to access backend. The menu items that users can access are determined by the capabilities they have.', 'bskgfbl' ); ?></p>
		<p><?php esc_html_e( 'Requried capability in the following table is the WordPress capability value to be checked.', 'bskgfbl' ); ?></p>
		<div id="bsk_gfbl_backend_access_setting_by_role_section_ID" class="bsk-gfbl-backend-access-setting-by-role-seciton" style="background: #FFFFFF;">
			<p class="bsk-gfbl-error" style="display: none;" id="bsk_gfbl_capabilities_setting_error_ID"></p>
			<p>
				<table class="wp-list-table widefat fixed">
					<thead>
						<th style="width: 10%;">Menu Items</th>
						<th style="width: 15%;">What can do</th>
						<th style="width: 15%;">Requried capability</th>
						<th style="width: 10%;">Administrator</th>
						<th style="width: 10%;">
							<?php if( current_user_can( 'administrator' ) ) { ?>
							<input type="checkbox" class="bsk-gfbl-cap-settings-enable-checkbox"<?php echo $enable_editor_checked; ?> data-role="editor">
							<?php } ?>
							<label for="bsk_gfbl_cap_settings_enable_editor_ID"> Editor</label>
							<span class="bsk-gfbl-cap-settings-enable-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
						</th>
						<th style="width: 10%;">
							<input type="checkbox" class="bsk-gfbl-cap-settings-enable-checkbox"<?php echo $enable_author_checked; ?> data-role="author">
							<label for="bsk_gfbl_cap_settings_enable_author_ID"> Author</label>
							<span class="bsk-gfbl-cap-settings-enable-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
						</th>
						<th style="width: 10%;">
							<input type="checkbox" class="bsk-gfbl-cap-settings-enable-checkbox"<?php echo $enable_contributor_checked; ?> data-role="contributor">
							<label for="bsk_gfbl_cap_settings_enable_contributor_ID"> Contributor</label>
							<span class="bsk-gfbl-cap-settings-enable-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
						</th>
						<th style="width: 20%; padding-right: 20px;">
							<select name="bsk_gfbl_cap_settings_custom_role_select" id="bsk_gfbl_cap_settings_custom_role_select_ID" style="max-width: 320px;">
								<option value="">Enable custom role of: </option>
								<?php
									$editable_roles = array_reverse( get_editable_roles() );
									foreach ( $editable_roles as $role => $details ) {
										if ( in_array( $role, array( 'administrator', 'editor', 'author', 'contributor', 'subscriber' ) ) ) {
											continue;
										}
										$name = translate_user_role( $details['name'] );
										echo "<option value='" . esc_attr( $role ) . "'>$name</option>";
									}
								?>
							</select>
							<span class="bsk-gfbl-cap-settings-enable-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
						</th>
					</thead>
					<tbody id="bsk_gfbl_capabilities_setting_table_body_ID">
						<tr class="bsk-gfbl-th-background">
							<th rowspan="9">
								<?php esc_html_e( 'Blacklist', 'bskgfbl' ); ?><br />
								<?php esc_html_e( 'White List', 'bskgfbl' ); ?><br />
								<?php esc_html_e( 'Email List', 'bskgfbl' ); ?><br />
								<?php esc_html_e( 'IP List', 'bskgfbl' ); ?><br />
								<?php esc_html_e( 'Invitation Codes List', 'bskgfbl' ); ?><br />
							</th>
							<td>View List</td>
							<td>bsk_gfbl_view_list</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_view_list" data-requried="bsk_gfbl_view_list">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_view_list" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr class="bsk-gfbl-th-background">
							<td>Add List</td>
							<td>bsk_gfbl_add_list</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_add_list" data-requried="bsk_gfbl_add_list">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_add_list" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr class="bsk-gfbl-th-background">
							<td>Edit List</td>
							<td>bsk_gfbl_edit_list</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_edit_list" data-requried="bsk_gfbl_edit_list">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_edit_list" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr class="bsk-gfbl-th-background">
							<td scope="row">Delete List</td>
							<td scope="row">bsk_gfbl_delete_list</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_delete_list" data-requried="bsk_gfbl_delete_list">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_delete_list" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr class="bsk-gfbl-th-background">
							<td>View Item</td>
							<td>bsk_gfbl_view_item</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_view_item" data-requried="bsk_gfbl_view_item">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_view_item" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr class="bsk-gfbl-th-background">
							<td>Add Item</td>
							<td>bsk_gfbl_add_item</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_add_item" data-requried="bsk_gfbl_add_item">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_add_item" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr class="bsk-gfbl-th-background">
							<td scope="row">Delete Item</td>
							<td scope="row">bsk_gfbl_delete_item</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_delete_item" data-requried="bsk_gfbl_delete_item">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_delete_item" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr class="bsk-gfbl-th-background">
							<td>Import Item from CSV</td>
							<td>bsk_gfbl_import_item</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_import_item" data-requried="bsk_gfbl_import_item">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_import_item" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr class="bsk-gfbl-th-background">
							<td>Export Item to CSV</td>
							<td>bsk_gfbl_export_item</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_export_item" data-requried="bsk_gfbl_export_item">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_export_item" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr>
							<th rowspan="2" scope="rowgroup">
								<?php esc_html_e( 'Blocked Data', 'bskgfbl' ); ?>
							</th>
							<td>View blocked data</th>
							<td>bsk_gfbl_blocked_data_view</th>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>">
								<?php
								$checked = '';
								if ( $author_capabilities && is_array( $author_capabilities ) && array_key_exists( 'bsk_gfbl_blocked_data_view', $author_capabilities ) ) {
									$checked = ' checked';
								}
								?>
								<input type="checkbox" class="bsk-gfbl-author-blocked-data-view-checkbox bsk-gfbl-role-special-capability-chk"<?php echo $author_blocked_data_view_chk_disabled . $checked; ?> data-role="author" data-capability="bsk_gfbl_blocked_data_view" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_blocked_data_view" data-requried="bsk_gfbl_blocked_data_view">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_blocked_data_view" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr>
							<td>Delete blocked data</td>
							<td>bsk_gfbl_blocked_data_delete</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">Y</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_blocked_data_delete" data-requried="bsk_gfbl_blocked_data_delete">
								<input type="checkbox" class="bsk-gfbl-role-special-capability-chk" style="display: none;" data-role="" data-capability="bsk_gfbl_blocked_data_delete" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
						</tr>
						<tr class="bsk-gfbl-th-background">
							<th><?php esc_html_e( 'Settings', 'bskgfbl' ); ?></th>
							<td>Do settings</td>
							<td>bsk_gfbl_do_settings</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability<?php echo $editor_disable_class; ?>">
								<?php
								$checked = '';
								if ( $editor_capabilities && is_array( $editor_capabilities ) && array_key_exists( 'bsk_gfbl_do_settings', $editor_capabilities ) ) {
									$checked = ' checked';
								}
								?>
								<input type="checkbox" class="bsk-gfbl-editor-do-settings-checkbox bsk-gfbl-role-special-capability-chk"<?php echo $editor_do_settings_chk_disabled . $checked; ?> data-role="editor" data-capability="bsk_gfbl_do_settings" />
								<span class="bsk-gfbl-ajax-loader" style="display: none;"><?php echo BSK_GFBLCV::$ajax_loader; ?></span>
							</td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-custom-role-capability bsk_gfbl_do_settings" data-requried="bsk_gfbl_do_settings"></td>
						</tr>
						<tr>
							<td><?php esc_html_e( 'License & Update', 'bskgfbl' ); ?></td>
							<td>Activate / Deactivate license</td>
							<td>bsk_gfbl_license_update</td>
							<td class="bsk-gfbl-td-admin-capability">Y</td>
							<td class="bsk-gfbl-td-editor-capability"></td>
							<td class="bsk-gfbl-td-author-capability<?php echo $author_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-contributor-capability<?php echo $contributor_disable_class; ?>"></td>
							<td class="bsk-gfbl-td-custom-role-capability" data-requried="bsk_gfbl_license_update"></td>
						</tr>
					</tbody>
				</table>
			</p>
		</div>
    </div>
	<?php 
		$ajax_nonce = wp_create_nonce( 'bsk_gfbl_capabilities_settings_save_ajax_oper_nonce' );
	?>
	<p>
		<input type="hidden" id="bsk_gfbl_capabilities_settings_save_ajax_oper_nonce_ID" value="<?php echo $ajax_nonce; ?>" />
	</p>
    </form>
    <?php
	}

	

	
	

}