<?php

class BSK_GFBLCV_Dashboard_WPForms_Entry {

	function __construct() {

        if ( BSK_GFBLCV_Dashboard_Common::bsk_gfblcv_is_form_plugin_supported('WPF') ) {
            add_action( 'wpforms_entry_details_sidebar', array( $this, 'bsk_gfblcv_wpf_entry_actions_fun' ), 30, 2 );
        }
		
	}

    function bsk_gfblcv_wpf_entry_actions_fun( $entry, $form_data ) {

        if ( ! class_exists( 'BSK_FormsBlacklist_Free_Common' ) ) {
            require_once( BSK_GFBLCV_FREE_DIR . 'classes/bskcommon/common.php' );
        }

        $entry_fields = json_decode( $entry->fields, true );

        $emails = array();
        foreach ( $entry_fields as $field_data ) {

            if ( ! is_array( $field_data ) || ! isset( $field_data['value'] ) ) {
                continue;
            }

            $field_value = $field_data['value'];
            if ( is_array( $field_value ) || is_object( $field_value ) ) {
                continue;
            }
            
            if ( empty( $field_value ) || trim( $field_value ) == '' ) {
                continue;
            }
            $emails_return = BSK_FormsBlacklist_Free_Common::bsk_gfblcv_extract_emails_from_string( $field_value );
            if ( $emails_return == false ) {
                continue;
            }
            $emails = array_merge( $emails, $emails_return );
        }

        $license_type = 'PERSONAL';
        $ajax_nonce = wp_create_nonce( 'bsk_gfbl_ff_entry_save_item_to_list_ajax_oper_nonce' );
        ?>
        <div id="wpforms-entry-details-bsk-gfblcv-actions" class="bsk-gfblcv-form-entry-actions-container postbox">
            <div class="postbox-header">
				<h2 class="hndle">
					<span>BSK Forms Blacklist Actions</span>
				</h2>
			</div>
            <div class="inside">
                <div class="bsk-gfblcv-form-entry-action-section email-action-section">
                <h4>Add Email to List</h4>
                <?php 
                if ( count( $emails ) < 1 ) { 
                    echo '<p>No email found</p>';
                } else {
                    echo '<ul>';
                    foreach ( $emails as $email ) {
                        echo '<li><label><input type="checkbox" value="' . $email . '" class="bsk-gfblcv-form-entry-email">' . $email . '</label></li>';
                    }
                    echo '</ul>';

                    $anchor_html = '
                        <p>
                            <a href="javascript:void(0);" class="button bsk-gfblcv-form-entry-add-item-to-list-select-save">Save</a>
                        </p>
                    ';
                    if( $license_type == 'PERSONAL' || $license_type == 'CREATOR' ){
                        $anchor_html = '';
                    }

                    echo '
                        <div class="bsk-gfblcv-form-entry-list-container">
                            <p>
                                <select class="bsk-gfblcv-form-entry-add-to-list-select">
                                    <option value="">Select a list...</option>
                                    <optgroup label="Blacklist">' .
                                    BSK_GFBLCV_Dashboard_Common::bsk_gfblcv_get_list_by_type( 'BLACK_LIST', 0 ) . '
                                    </optgroup>
                                    <optgroup label="White List">' .
                                    BSK_GFBLCV_Dashboard_Common::bsk_gfblcv_get_list_by_type( 'WHITE_LIST', 0 ) . '
                                    </optgroup>
                                    <optgroup label="Email List">' .
                                    BSK_GFBLCV_Dashboard_Common::bsk_gfblcv_get_list_by_type( 'EMAIL_LIST', 0 ) . '
                                    </optgroup>
                                </select>
                            </p>' .
                            $anchor_html .
                           '<p class="bsk-gfblcv-form-entry-add-to-list-error" style="color: #FF0000;display: none;"></p>
                            <p class="bsk-gfblcv-form-entry-add-to-list-success" style="color: #008800;display: none;"></p>
                        </div>';
                }
                ?>
                </div>
                <?php if ( ! empty( $entry->ip_address ) ) { ?>
                <div class="bsk-gfblcv-form-entry-action-section ip-action-section" style="margin-top: 40px;">
                    <h4>Add IP to List</h4>
                    <ul>
                        <li>
                        <?php esc_html_e( 'IP Address:', 'formidable' ); ?>
                        <b><?php echo esc_html( $entry->ip_address ); ?></b>
                        </li>
                    </ul>
                    <div class="bsk-gfblcv-form-entry-list-container">
                        <p>
                            <select class="bsk-gfblcv-form-entry-add-to-list-select">
                                <option value="">Select a IP list...</option>
                                    <?php echo BSK_GFBLCV_Dashboard_Common::bsk_gfblcv_get_list_by_type( 'IP_LIST', 0 ); ?>
                            </select>
                        </p>
                        <?php if( $license_type == 'PERSONAL' || $license_type == 'CREATOR' ){} else { ?>
                        <p>
                            <a href="javascript:void(0);" class="button bsk-gfblcv-form-entry-add-ip-to-list-select-save" data-ip="<?php echo esc_attr( $entry->ip_address ); ?>">Save</a>
                        </p>
                        <?php } ?>
                        <p class="bsk-gfblcv-form-entry-add-to-list-error" style="color: #FF0000;display: none;"></p>
                        <p class="bsk-gfblcv-form-entry-add-to-list-success" style="color: #008800;display: none;"></p>
                    </div>
                </div>
                <?php } ?>
                <?php
                $settings_license_page_url = 'https://www.bannersky.com/gravity-forms-blacklist-and-custom-validation/';
                $update_license_html  = 
                    '<div class="bsk-gfblcv-tips-box">
                        <p>This feature requires a <span style="font-weight: bold;">BUSINESS</span>( or above ) license for the Pro version. </p>
                        <p><a href="'.$settings_license_page_url.'" target="_blank">Click here to buy a license</a></p>
                    </div>';
                echo $update_license_html;
                ?>
                <input type="hidden" class="bsk-gfblcv-form-entry-add-to-list-save-ajax-nonce" value="<?php echo $ajax_nonce; ?>" />
            </div>
        </div>
        <?php
    }
}
