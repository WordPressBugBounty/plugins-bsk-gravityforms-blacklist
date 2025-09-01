jQuery(document).ready( function($) {
    
    /* Global settings */
	
	$("#bsk_gfblcv_list_edit_form_id").keypress(function(e) {
		var key = e.charCode || e.keyCode || 0;     
		if (key == 13) {
			e.preventDefault();
		}
    });
	
    /* Blacklist */
    
	$("#bsk_gfblcv_blacklist_list_save_ID").click(function(){
		var list_name = $("#bsk_gfblcv_list_name_ID").val();
        
		list_name = $.trim(list_name);
		if( list_name == "" ){
			alert( "List name cannot be empty" );
			$("#bsk_gfblcv_list_name_ID").focus();
			
			return false;
		}
		
		$("#bsk_gfblcv_list_edit_form_id").submit();
	});
    
    $(".bsk-gfblcv-list-check-way-raido").click( function(){
        var blacklist_check_way = $(this).val();
        
        if( blacklist_check_way == 'ALL' ){
            $( "#bsk_gfblcv_edit_item_container_ID" ).css( "display", "none" );
            $( "#bsk_gfblcv_black_whitle_list_check_all_ID" ).css( "display", "block" );
        }else{
            $( "#bsk_gfblcv_edit_item_container_ID" ).css( "display", "block" );
            $( "#bsk_gfblcv_black_whitle_list_check_all_ID" ).css( "display", "none" );
        }
    });
    
    
	//for IP address, only accpet number, . , * and -
    $(".add-item-input-for-iplist").keyup( function(){
        //only number & letters
        this.value = this.value.replace(/[^0-9.\*\- ]/g, '');
    });
    
	function bsk_gfblcv_valid_email_address( email_address ) {
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
        if( pattern.test( email_address ) ){
			return true;
		}
		
		//check if *@domain.com
		var email_str_array = email_address.split('@');
		if( Array.isArray( email_str_array ) == false || 
			email_str_array.length < 2 ){
				
			return false;
		}
		
		if( email_str_array[0] == '*' || pattern.test( 'abc' + email_str_array[1] ) ){
			return true;
		}
		
		return false;
    }
    
    function bsk_gfblcv_valid_ip_address( ip_address ) {
        var pattern = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g);
        
        if( pattern.test( ip_address ) ){
			return true;
		}
		
		//check if 45.91.94.*
		var pattern = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]|\*)$/g);
        if( pattern.test( ip_address ) ){
			return true;
		}
        
        //check if 45.91.94.1 - 45.91.94.123
		var pattern = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\ \-\ (([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g);
        
        if( pattern.test( ip_address ) ){
            var ip_start_end = ip_address.split( '-' );
            ip_start_end[0] = $.trim( ip_start_end[0] );
            ip_start_end[1] = $.trim( ip_start_end[1] );
            var ip_start_array = ip_start_end[0].split( '.' );
            var ip_end_array = ip_start_end[1].split( '.' );
            
            if( ip_start_array.length != 4 || ip_end_array.length != 4 ){
                return false;
            }
            
            if( ip_start_array[0] != ip_end_array[0] ){
                return false;
            }
            
            ip_start_array[1] = parseInt( ip_start_array[1] );
            ip_start_array[2] = parseInt( ip_start_array[2] );
            ip_start_array[3] = parseInt( ip_start_array[3] );
            ip_end_array[1] = parseInt( ip_end_array[1] );
            ip_end_array[2] = parseInt( ip_end_array[2] );
            ip_end_array[3] = parseInt( ip_end_array[3] );
            
            if( ip_start_array[1] > ip_end_array[1] ){
                return false;
            }
            
            if( ip_start_array[1] == ip_end_array[1] &&
                ip_start_array[2] > ip_end_array[2] ){
                return false;
            }
            
            if( ip_start_array[1] == ip_end_array[1] &&
                ip_start_array[2] == ip_end_array[2] && 
                ip_start_array[3] > ip_end_array[3] ){
                return false;
            }
            
			return true;
		}

        //check if 45.91.94.1-45.91.94.123
		var pattern = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\-(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g);
        if( pattern.test( ip_address ) ){
            var ip_start_end = ip_address.split( '-' );
            var ip_start_array = ip_start_end[0].split( '.' );
            var ip_end_array = ip_start_end[1].split( '.' );
            
            if( ip_start_array[0] != ip_end_array[0] ){
                return false;
            }
            
            ip_start_array[1] = parseInt( ip_start_array[1] );
            ip_start_array[2] = parseInt( ip_start_array[2] );
            ip_start_array[3] = parseInt( ip_start_array[3] );
            ip_end_array[1] = parseInt( ip_end_array[1] );
            ip_end_array[2] = parseInt( ip_end_array[2] );
            ip_end_array[3] = parseInt( ip_end_array[3] );
            
            if( ip_start_array[1] > ip_end_array[1] ){
                return false;
            }
            
            if( ip_start_array[1] == ip_end_array[1] &&
                ip_start_array[2] > ip_end_array[2] ){
                return false;
            }
            
            if( ip_start_array[1] == ip_end_array[1] &&
                ip_start_array[2] == ip_end_array[2] && 
                ip_start_array[3] > ip_end_array[3] ){
                return false;
            }
            
			return true;
		}
        
		return false;
    }
	
	$("#bsk_gfblcv_add_item_by_input_save_anchor_ID").click(function(){
		var item_value = $("#bsk_gfblcv_add_item_by_input_name_ID").val();
		var item_list_type = $("#bsk_gfblcv_items_list_type_ID").val();
		
		item_value = $.trim(item_value);
		if( item_value == "" ){
			alert( "Item value cannot be empty" );
			$("#bsk_gfblcv_add_item_by_input_name_ID").focus();
			
			return false;
		}
		if( item_list_type == 'EMAIL_LIST' ){
			//check if item _value a valid email
			if( !bsk_gfblcv_valid_email_address( item_value ) ){
				alert( "Please enter valid email address or email domain name." );
				$("#bsk_gfblcv_add_item_by_input_name_ID").focus();
				
				return false;
			}
		}else if( item_list_type == 'IP_LIST' ){
			//check if item _value a valid email
			if( !bsk_gfblcv_valid_ip_address( item_value ) ){
				alert( "Please enter valid IP address or IP ranges" );
				$("#bsk_gfblcv_add_item_by_input_name_ID").focus();
				
				return false;
			}
		}
		
		$("#bsk_gfblcv_action_ID").val( "save_item" );
		$("#bsk_gfblcv_items_form_id").submit();
	});
	
	$(".bsk-gfblcv-item-delete-anchor").click(function(){
		var item_id = $(this).attr('rel');
		
		if( parseInt(item_id) < 1 ){
			alert( "Invalid opearation" );
		}
		
		$("#bsk_gfblcv_item_id_ID").val( item_id );
		$("#bsk_gfblcv_action_ID").val( "delete_item" );
        $("#bsk_gfblcv_items_form_id").submit();

	});
	
	$("#bsk_gfblcv_add_item_by_csv_ID").change(function (){
       var file_name = $(this).val();
       $("#bsk_gfblcv_add_item_by_csv_selected_file_ID").val( file_name );
    });
	
	$("#bsk_gfblcv_add_item_by_csv_save_anchor_ID").click(function(){
		$(this).parents( '#bsk_gfblcv_add_items_container_ID' ).find( '.bsk-gfblcv-tips-box' ).css( "display", "block" );
	});
	
	$("#bsk_gfblcv_export_items_as_CSV_anchor_ID").click(function(){
		$(this).parents( '.bsk-gfblcv-admin-export-items-as-csv-div' ).find( '.bsk-gfblcv-tips-box' ).css( "display", "block" );
	});
	
	$(".bsk-gfblcv-admin-delete-list").click(function(){
		var list_id = $(this).attr("rel");
		var count = $(this).attr("count");
		
		if( parseInt(list_id) < 1 ){
			alert( "Invalid operation" );
			return false;
		}
		
		if( parseInt(count) > 0 ){
			r = confirm( count + " item(s) inlcuded in this list, are you sure you will remove them?" );
			if( r == false ){
				return false;
			}
		}
		
		$("#bsk_gfblcv_list_id_to_be_processed_ID").val( list_id );
		$("#bsk_gfblcv_action_ID").val( "delete_list_by_id" );
		$("#bsk_gfblcv_lists_form_id").submit();
	});
	
	$("#bsk_gfblcv_add_email_domain_name_checkbox_ID").on("click", function(){
		if( $(this).is(":checked") ){
			$("#bsk_gfblcv_add_email_domain_name_input_container_ID").css( "display", "block" );
			
			$("#bsk_gfblcv_add_email_list_item_input_container_ID").css( "display", "none" );
		}else{
			$("#bsk_gfblcv_add_email_domain_name_input_container_ID").css( "display", "none" );
			
			$("#bsk_gfblcv_add_email_list_item_input_container_ID").css( "display", "block" );
		}
	});
	
	$("#bsk_gfblcv_add_email_domain_name_save_anchor_ID").click(function(){
		var item_value = $("#bsk_gfblcv_email_domain_name_ID").val();
		var item_list_type = $("#bsk_gfblcv_items_list_type_ID").val();
		
		item_value = $.trim(item_value);
		if( item_value == "" ){
			alert( "Item value cannot be empty" );
			$("#bsk_gfblcv_add_item_by_input_name_ID").focus();
			
			return false;
		}
		if( item_list_type == 'EMAIL_LIST' ){
			//check if item _value a valid email
			if( !bsk_gfblcv_valid_email_address( item_value ) ){
				alert( "Please enter valid email address" );
				$("#bsk_gfblcv_add_item_by_input_name_ID").focus();
				
				return false;
			}
		}
		
		$("#bsk_gfblcv_action_ID").val( "save_item" );
		$("#bsk_gfblcv_items_form_id").submit();
	});
    
    /* IP List */
    $( ".bsk-gfblcv-ip-list-check-way-radio" ).click( function(){
        var ip_check_way = $(this).val();
        
        if( ip_check_way == 'COUNTRY' ){
            $( "#bsk_gfblcv_edit_item_container_ID" ).css( "display", "none" );
            $( "#bsk_gfblcv_iplist_by_country_settings_container_ID" ).css( "display", "block" );
        }else{
            $( "#bsk_gfblcv_edit_item_container_ID" ).css( "display", "block" );
            $( "#bsk_gfblcv_iplist_by_country_settings_container_ID" ).css( "display", "none" );
        }
    } );
    
    $("#bsk_gfblcv_iplist_by_country_country_to_block_or_allow_ID").change( function() {
        var country_code = $(this).val();
        if( country_code == '' ){
            return;
        }
        //add new cat id
        var exist_country_codes = $("#bsk_gfblcv_iplist_by_country_exist_countries_code_ID").val();
        var exist_country_codes_array = new Array;
        var already_set = false;
        if( exist_country_codes.length > 0 ){
            exist_country_codes_array = exist_country_codes.split(',');
            if( exist_country_codes_array.length > 0 ){
                for( var i = 0; i < exist_country_codes_array.length; i++ ){
                    if( exist_country_codes_array[i] == country_code ){
                        already_set = true;
                        break;
                    }
                }
            }
        }
        if( already_set == true ){
            return;
        }
        exist_country_codes_array.push( country_code );
        var country_label = $("#bsk_gfblcv_iplist_by_country_country_to_block_or_allow_ID option:selected").text();
        country_label = $.trim(country_label);
        var delete_icon = $("#bsk_gfblcv_delete_country_code_icon_ID").val();
        var html = '<span style="display: inline-block;padding-right:10px;"><a href="javascript:void(0);" class="bsk-gfblcv-delete-country-code-anchor" data-country_code="' + country_code + '"><img src="' + delete_icon + '" style="width:12px;height:12px;" /></a>&nbsp;' + country_label + '</span>';
        $("#bsk_gfblcv_iplist_by_country_added_countries_container_ID").append( html );
        $("#bsk_gfblcv_iplist_by_country_exist_countries_code_ID").val( exist_country_codes_array.join(',') );
    });
    
    $("#bsk_gfblcv_iplist_by_country_settings_container_ID").on("click", ".bsk-gfblcv-delete-country-code-anchor", function(){
        var country_code = $(this).data( 'country_code' );
        
        var exist_country_codes = $("#bsk_gfblcv_iplist_by_country_exist_countries_code_ID").val();
        var exist_country_codes_array = new Array;
        var new_country_codes_array = new Array;
        if( exist_country_codes.length > 0 ){
            exist_country_codes_array = exist_country_codes.split(',');
            if( exist_country_codes_array.length > 0 ){
                for( var i = 0; i < exist_country_codes_array.length; i++ ){
                    if( exist_country_codes_array[i] == country_code ){
                        continue;
                    }
                    new_country_codes_array.push( exist_country_codes_array[i] );
                }
            }
        }
        var new_str = new_country_codes_array.join(',');
        $("#bsk_gfblcv_iplist_by_country_exist_countries_code_ID").val( new_str );
        
        $(this).parent().remove();
    });
    
    
    $( ".bsk-gfblcv-iplist-test-anchor" ).click( function() {
        var api_server = $("#bsk_gfblcv_iplist_by_country_API_server_to_use_ID").val();
        api_server_key_require = $("#bsk_gfblcv_iplist_by_country_API_server_to_use_ID").children(":selected").attr("id");
        var api_key = '';
        var api_test_ip = $("#bsk_gfblcv_iplist_by_country_API_test_IP_value_ID").val();
        
        if( $("#bsk_gfblcv_iplist_by_country_API_key_ID").length ){
            api_key = $("#bsk_gfblcv_iplist_by_country_API_key_ID").val();
        }
        
        $( "#bsk_gfblcv_iplist_api_test_response_container_ID" ).html( '' );
        if( api_server == '' ){
            $( "#bsk_gfblcv_iplist_api_test_response_container_ID" ).html( '<p style="color: #FF0000;">Please choose a API serer.</p>' );
            $("#bsk_gfblcv_iplist_by_country_API_server_to_use_ID").focus();
            
            return;
        }
        
        if( api_server_key_require == 'YES' && $.trim( api_key ) == '' ){
            $( "#bsk_gfblcv_iplist_api_test_response_container_ID" ).html( '<p style="color: #FF0000;">Please enter you API key.</p>' );
            $( "#bsk_gfblcv_iplist_by_country_API_key_ID" ).focus();
            
            return;
        }
        
        api_test_ip = $.trim( api_test_ip );
        if( api_test_ip == '' ){
            $( "#bsk_gfblcv_iplist_api_test_response_container_ID" ).html( '<p style="color: #FF0000;">Please enter an IP address.</p>' );
            $( "#bsk_gfblcv_iplist_by_country_API_test_IP_value_ID" ).focus();
            
            return;
        }else{
            validate_ip_return = bsk_gfblcv_valid_ip_address( api_test_ip );
            if( validate_ip_return == false ){
                $( "#bsk_gfblcv_iplist_api_test_response_container_ID" ).html( '<p style="color: #FF0000;">Invalid IP address.</p>' );
                $( "#bsk_gfblcv_iplist_by_country_API_test_IP_value_ID" ).focus();

                return;
            }
        }
        
        selected_country_val = $("#bsk_gfblcv_iplist_by_country_exist_countries_code_ID").val();
        var ajax_loader = $(this).parent().find( '.bsk-gfblcv-iplist-api-test-ajax-loder' );
        
        //ajax to check api
        var nonce_val = $("#bsk_gfblcv_ip_list_test_api_nonce_ID").val();
        var data = { 
                        action: 'bsk_gfblcv_ip_list_test_API',
                        server: api_server,
                        key: api_key,
                        ip: api_test_ip,
                        selected_country: selected_country_val,
                        nonce: nonce_val
                   };
        
        ajax_loader.css( "display", "inline-block" );
        $.post( ajaxurl, data, function( response ) {
            ajax_loader.css( "display", "none" );
            $( "#bsk_gfblcv_iplist_api_test_response_container_ID" ).html( response );
        });
        
    });
    
    $("#bsk_gfblcv_iplist_by_country_API_server_to_use_ID").change( function(){
        var api_server = $(this).val();
        api_server_key_require = $(this).children(":selected").attr("id");

        $("#bsk_gfblcv_iplist_by_country_settings_container_ID").find( ".bsk-gfblcv-iplist-by-country-api-server-ref" ).css( "display", "none" );
        $("#bsk_gfblcv_iplist_by_country_settings_container_ID").find( "#bsk_gfblcv_iplist_by_country_API_key_ID" ).removeAttr( "disabled" );
        $("#bsk_gfblcv_iplist_by_country_settings_container_ID").find( "#bsk_gfblcv_iplist_by_country_API_key_ID" ).val( "" );
        if( api_server == '' ){
            return;
        }
        api_server = api_server.replace( /\./g, '_' );
        $("#bsk_gfblcv_iplist_by_country_api_server_ref_" + api_server + '_ID').css( "display", "inline-block" );
        
        if( api_server_key_require == 'NO' ){
            $("#bsk_gfblcv_iplist_by_country_settings_container_ID").find( "#bsk_gfblcv_iplist_by_country_API_key_ID" ).prop( 'disabled', true );
        }
    });
    
    
    /*
     * blocked entries
     *
     */
    $("#bsk_gfbl_form_select_to_list_entries_ID, #bsk_gfbl_form_selected_plugin_ID").change( function(){
        var slected_form = $(this).val();
        
        $(this).parents( 'form' ).submit();
    });
    
    $( ".bsk-gfblcv-notify-bloked-enable-radio" ).click( function(){
        var notify_blocked_enable = $("input[name='bsk_gfblcv_notify_blocked_enable']:checked").val();
        var details_container = $(this).parents( ".bsk-gfblcv-notify-administrtor-settings" ).find( ".bsk-gfblcv-administrator-mails-details-container" );
        
        if( notify_blocked_enable == 'NO' ){
            details_container.css( "display", "none" );
            return;
        }
        
        details_container.css( "display", "block" );
    });
    
    /*
     * Settings
     *
     */
    /* settings tab switch */
	$("#bsk_gfblcv_setings_wrap_ID .nav-tab-wrapper a").click(function(){
		//alert( $(this).index() );
		$('#bsk_gfblcv_setings_wrap_ID section').hide();
		$('#bsk_gfblcv_setings_wrap_ID section').eq($(this).index()).show();
		
		$(".nav-tab").removeClass( "nav-tab-active" );
		$(this).addClass( "nav-tab-active" );
		
		return false;
	});
    
	//settings target tab
	if( $("#bsk_gfblcv_settings_target_tab_ID").length > 0 ){
		var target = $("#bsk_gfblcv_settings_target_tab_ID").val();
		if( target ){
			$("#bsk_gfblcv_setings_tab-" + target).click();
		}
	}
    
    $("#bsk_gfbl_form_select_to_list_entries_ID, #bsk_gfbl_form_selected_plugin_ID").change( function(){
        var slected_form = $(this).val();
        
        $(this).parents( 'form' ).submit();
    });
    
    $( ".bsk-gfblcv-notify-bloked-enable-radio" ).click( function(){
        var notify_blocked_enable = $("input[name='bsk_gfblcv_notify_blocked_enable']:checked").val();
        var details_container = $(this).parents( ".bsk-gfblcv-notify-administrtor-settings" ).find( ".bsk-gfblcv-administrator-mails-details-container" );
        
        if( notify_blocked_enable == 'NO' ){
            details_container.css( "display", "none" );
            return;
        }
        
        details_container.css( "display", "block" );
    });
    
    
    /*
     * gravity forms form settings
     */
    $( ".bsk-gfblcv-form-settings-enable-raido" ).change(function () {

        var enable = $("input[type='radio'][name='bsk_gfblcv_form_settings_enable']:checked").val();
        var form_settings_container = $(this).parents( '.bsk-gfblcv-form-settings-container' );
        
        if( enable == 'DISABLE' ){
            form_settings_container.find( ".bsk-gfblcv-form-settings-actions-container" ).css( "display", "none" );
            form_settings_container.find( ".bsk-gfblcv-form-settings-blocked-data-container" ).css( "display", "none" );
            form_settings_container.find( ".bsk-gfblcv-form-settings-entry-container" ).css( "display", "none" );
            form_settings_container.find( ".bsk-gfblcv-form-settings-error-messages-container" ).css( "display", "none" );

            form_settings_container.parent().find( "#bsk_gfblcv_cf7_form_mappings_ID" ).css( "display", "none" );
            
            return;
        }
        
        form_settings_container.find( ".bsk-gfblcv-form-settings-actions-container" ).css( "display", "table-row" );
        form_settings_container.parent().find( "#bsk_gfblcv_cf7_form_mappings_ID" ).css( "display", "block" );
        
        bsk_gfblcv_control_settings_display( form_settings_container );
    });
    
    function bsk_gfblcv_control_settings_display( $root_container_object ){
        
        $root_container_object.find( ".bsk-gfblcv-form-settings-blocked-data-container" ).css( "display", "none" );
        $root_container_object.find( ".bsk-gfblcv-form-settings-entry-container" ).css( "display", "none" );
        $root_container_object.find( ".bsk-gfblcv-form-settings-error-messages-container" ).css( "display", "none" );
        
        $root_container_object.find( ".bsk-gfblcv-notificaitons-to-skip" ).css( 'display', 'none' );
        $root_container_object.find( ".bsk-gfblcv-confirmations-to-go" ).css( 'display', 'none' );
        
        var is_action_block = $( ".bsk-gfblcv-form-settings-action-block-chk" ).is( ":checked" );
        var is_action_skip = $( ".bsk-gfblcv-form-settings-action-skip-chk" ).is( ":checked" );
        var is_action_confirmation = $( ".bsk-gfblcv-form-settings-action-confirmation-chk" ).is( ":checked" );
        var is_notify_administrator = $("input[type='radio'][name='bsk_gfblcv_notify_administrators']:checked").val();
        var is_notify_administrator = is_notify_administrator == 'YES' ? true : false;
        
        
        $root_container_object.find( ".bsk-gfblcv-form-settings-entry-container" ).css( "display", "block" );
        
        if( is_action_block ){
            $root_container_object.find( ".bsk-gfblcv-form-settings-blocked-data-container" ).css( "display", "block" );
            $root_container_object.find( ".bsk-gfblcv-form-settings-error-messages-container" ).css( "display", "block" );
            $root_container_object.find( ".bsk-gfblcv-form-settings-entry-container" ).css( "display", "none" );
        }
        
        if( is_action_skip ){
            $root_container_object.find( ".bsk-gfblcv-notificaitons-to-skip" ).css( 'display', 'table-row' );
        }
        
        if( is_action_confirmation ){
            $root_container_object.find( ".bsk-gfblcv-confirmations-to-go" ).css( 'display', 'table-row' );
        }
        
        if( is_notify_administrator ){
            $root_container_object.find( ".bsk-gfblcv-form-settings-notify-send-to" ).css( 'display', 'table-row' );
        }
    }

    $( ".bsk-gfblcv-form-settings-action-block-chk, .bsk-gfblcv-form-settings-action-skip-chk, .bsk-gfblcv-form-settings-action-confirmation-chk" ).change( function( event ){

        var form_settings_container = $(this).parents( '.bsk-gfblcv-form-settings-container' );

        if( $(this).hasClass( 'bsk-gfblcv-form-settings-action-block-chk' ) ){
            if( $(this).is( ':checked' ) ){
                form_settings_container.find( ".bsk-gfblcv-form-settings-action-skip-chk" ).prop( 'checked', false );
                form_settings_container.find( ".bsk-gfblcv-form-settings-action-confirmation-chk" ).prop( 'checked', false );
            }
        }else if( $(this).hasClass( 'bsk-gfblcv-form-settings-action-skip-chk' ) ){
            if( $(this).is( ':checked' ) ){
                form_settings_container.find( ".bsk-gfblcv-form-settings-action-block-chk" ).prop( 'checked', false );
            }
        }else if( $(this).hasClass( 'bsk-gfblcv-form-settings-action-confirmation-chk' ) ){
            if( $(this).is( ':checked' ) ){
                form_settings_container.find( ".bsk-gfblcv-form-settings-action-block-chk" ).prop( 'checked', false );
            }
        }
        
        bsk_gfblcv_control_settings_display( form_settings_container );
    });
    
    $(".bsk-gfblcv-notifiy-administrators-raido").change( function(){
        var notify_administrator = $("input[type='radio'][name='bsk_gfblcv_notify_administrators']:checked").val();
        var form_settings_container = $(this).parents( '.bsk-gfblcv-form-settings-container' );
        
        if( notify_administrator == 'YES' ){
            form_settings_container.find( ".bsk-gfblcv-form-settings-notify-send-to" ).css( 'display', 'table-row' );
        }else{
            form_settings_container.find( ".bsk-gfblcv-form-settings-notify-send-to" ).css( 'display', 'none' );
        }
    })
    
    $(".bsk-gfblcv-form-settings-delete-entry-radio").change( function(){
        var delete_entry = $("input[type='radio'][name='bsk_gfblcv_delete_entry']:checked").val();
        var pro_tips_container = $(this).parents( '.bsk-gfblcv-form-settings-delete-entry-tr' ).find( '.bsk-gfblcv-tips-box' );
        
        if( delete_entry == 'YES' ){
            pro_tips_container.css( 'display', 'block' );
        }else{
            pro_tips_container.css( 'display', 'none' );
        }
    })
    
    /*
     * formidable forms form field
     */
    $( ".bsk-gfbl-ff-form-field-apply-list-chk" ).click( function() {
        var checked = $(this).is(":checked");
        var type = $(this).data( 'list-type' );
        
        //uncheck or checkbox
        $(this).parents( 'ul' ).find( '.bsk-gfbl-ff-form-field-apply-list-chk' ).prop( 'checked', false );
        $(this).parents( 'ul' ).find( 'select' ).val( '');
        $(this).parents( 'ul' ).find( 'select' ).slideUp();
        //hide validaiton message
        $(this).parents( 'ul' ).find( '.bsk-gfbl-validation-message-field-setting' ).css( "display", "none" );
        
        //check the current
        if ( checked ) {
            $(this).prop( 'checked', true );
            //show select
            $(this).parent().find( 'select' ).slideDown();
            $(this).parents( 'ul' ).find( '.bsk-gfbl-validation-message-field-setting' ).css( "display", "block" );
        }
        
    });

    /* CF7 */
    $("#cf7_blacklist_skip_main_mail_chk_ID").click(function(){
        if( $(this).is(":checked") ){
            $("#cf7_blacklist_skip_mail_2_chk_li_ID").css("display", "none");
        }else{
            $("#cf7_blacklist_skip_mail_2_chk_li_ID").css("display", "inline-block");
        }
    });

    $( ".bsk-gfblcv-cf7-mapping-list-type-select" ).change( function() {
        var list_type = $( this ).val();

        $( this ).parents( 'tr' ).find( ".bsk-gfblcv-cf7-mapping-list-id-select, .bsk-gfblcv-cf7-mapping-comparison, .bsk-gfblcv-cf7-mapping-action, .bsk-gfblcv-cf7-mapping-action-for-invit, .bsk-gfblcv-cf7-validation-message" ).css( "display", "none" );
        if ( list_type == '' ) {
            return;
        }
        var list_id_class_identifier = '';
        var list_comparison_class_identifier = '';
        var validation_message_class_identifier = 'bsk-gfblcv-cf7-validation-message';
        switch( list_type ) {
            case 'BLACK_LIST':
                list_id_class_identifier = 'bsk-gfblcv-cf7-blacklist';
                list_comparison_class_identifier = 'bsk-gfblcv-cf7-mapping-comparison';
            break;
            case 'WHITE_LIST':
                list_id_class_identifier = 'bsk-gfblcv-cf7-whitelist';
                list_comparison_class_identifier = 'bsk-gfblcv-cf7-mapping-comparison';
            break;
            case 'EMAIL_LIST':
                list_id_class_identifier = 'bsk-gfblcv-cf7-emaillist';
                list_comparison_class_identifier = 'bsk-gfblcv-cf7-mapping-action';
            break;
            case 'IP_LIST':
                list_id_class_identifier = 'bsk-gfblcv-cf7-iplist';
                list_comparison_class_identifier = 'bsk-gfblcv-cf7-mapping-action';
            break;
            case 'INVIT_LIST':
                list_id_class_identifier = 'bsk-gfblcv-cf7-invitlist';
                list_comparison_class_identifier = 'bsk-gfblcv-cf7-mapping-action-for-invit';
            break;
            default:
                validation_message_class_identifier = ''; 
            break;
        }

        
        $( this ).parents( 'tr' ).find( ".bsk-gfblcv-cf7-mapping-list-id-select." + list_id_class_identifier ).css( "display", "inline-block" );
        $( this ).parents( 'tr' ).find( "." + list_comparison_class_identifier ).css( "display", "inline-block" );
        $( this ).parents( 'tr' ).find( "." + validation_message_class_identifier ).css( "display", "inline-block" );
    });

    $( ".bsk-gfblcv-cf7-mapping-list-id-select, .bsk-gfblcv-cf7-mapping-comparison, .bsk-gfblcv-cf7-mapping-action").change( function() {
        if ( $ ( this ).val() != '' ) {
            $( this ).parent().find( '.bsk-gfblcv-error-message' ).css( "display", "none" );
        }
    });
    
    /*
     * formidable forms form field
     */
    $("#bsk_gfblcv_forminator_setings_wrap_ID .nav-tab-wrapper a").click(function(){
		//alert( $(this).index() );
		$('#bsk_gfblcv_forminator_setings_wrap_ID section').hide();
		$('#bsk_gfblcv_forminator_setings_wrap_ID section').eq($(this).index()).show();
		
		$(".nav-tab").removeClass( "nav-tab-active" );
		$(this).addClass( "nav-tab-active" );
		
		return false;
	});
    
	//settings target tab
	if( $( "#bsk_gfblcv_forminator_settings_target_tab_ID" ).length > 0 ){
		var target = $( "#bsk_gfblcv_forminator_settings_target_tab_ID" ).val();
		if( target ){
			$( "#bsk_gfblcv_forminator_setings_tab-" + target ).click();
		}
	}

    $( ".bsk-gfblcv-frmt-mapping-list-type-select" ).change( function() {
        var list_type = $( this ).val();

        $( this ).parents( 'tr' ).find( ".bsk-gfblcv-frmt-mapping-list-id-select, .bsk-gfblcv-frmt-mapping-comparison, .bsk-gfblcv-frmt-mapping-action, .bsk-gfblcv-frmt-mapping-action-for-invit, .bsk-gfblcv-frmt-validation-message" ).css( "display", "none" );
        if ( list_type == '' ) {
            return;
        }
        var list_id_class_identifier = '';
        var list_comparison_class_identifier = '';
        var validation_message_class_identifier = 'bsk-gfblcv-frmt-validation-message';
        switch( list_type ) {
            case 'BLACK_LIST':
                list_id_class_identifier = 'bsk-gfblcv-frmt-blacklist';
                list_comparison_class_identifier = 'bsk-gfblcv-frmt-mapping-comparison';
            break;
            case 'WHITE_LIST':
                list_id_class_identifier = 'bsk-gfblcv-frmt-whitelist';
                list_comparison_class_identifier = 'bsk-gfblcv-frmt-mapping-comparison';
            break;
            case 'EMAIL_LIST':
                list_id_class_identifier = 'bsk-gfblcv-frmt-emaillist';
                list_comparison_class_identifier = 'bsk-gfblcv-frmt-mapping-action';
            break;
            case 'IP_LIST':
                list_id_class_identifier = 'bsk-gfblcv-frmt-iplist';
                list_comparison_class_identifier = 'bsk-gfblcv-frmt-mapping-action';
            break;
            case 'INVIT_LIST':
                list_id_class_identifier = 'bsk-gfblcv-frmt-invitlist';
                list_comparison_class_identifier = 'bsk-gfblcv-frmt-mapping-action-for-invit';
            break;
            default:
                validation_message_class_identifier = ''; 
            break;
        }

        
        $( this ).parents( 'tr' ).find( ".bsk-gfblcv-frmt-mapping-list-id-select." + list_id_class_identifier ).css( "display", "inline-block" );
        $( this ).parents( 'tr' ).find( "." + list_comparison_class_identifier ).css( "display", "inline-block" );
        $( this ).parents( 'tr' ).find( "." + validation_message_class_identifier ).css( "display", "inline-block" );
    });

    $( ".bsk-gfblcv-frmt-mapping-list-id-select, .bsk-gfblcv-frmt-mapping-comparison, .bsk-gfblcv-frmt-mapping-action").change( function() {
        if ( $ ( this ).val() != '' ) {
            $( this ).parent().find( '.bsk-gfblcv-error-message' ).css( "display", "none" );
        }
    });

    $(document).on('click', '.bsk-gfblcv-form-entry-email', function() {

        var error_obj = $(this).parents('.bsk-gfblcv-form-entry-action-section').find('.bsk-gfblcv-form-entry-add-to-list-error');
        var success_obj = $(this).parents('.bsk-gfblcv-form-entry-action-section').find('.bsk-gfblcv-form-entry-add-to-list-success');

        error_obj.hide();
        success_obj.hide();

        var anyChecked = $( '.bsk-gfblcv-form-entry-email:checked' ).length > 0;
        
        /* if ( anyChecked ) {
            $('.bsk-gfblcv-form-entry-list-container').show();
        } else {
            $('.bsk-gfblcv-form-entry-list-container').hide();
        } */
    });

    $(document).on('change', '.bsk-gfblcv-form-entry-add-to-list-select', function() {
        var error_obj = $(this).parents('.bsk-gfblcv-form-entry-action-section').find('.bsk-gfblcv-form-entry-add-to-list-error');
        var success_obj = $(this).parents('.bsk-gfblcv-form-entry-action-section').find('.bsk-gfblcv-form-entry-add-to-list-success');

        error_obj.hide();
        success_obj.hide();
    });

    $(document).on('click', '.bsk-gfblcv-form-entry-add-item-to-list-select-save', function(e) {

        e.preventDefault();

        var error_obj = $(this).parents('.bsk-gfblcv-form-entry-action-section').find('.bsk-gfblcv-form-entry-add-to-list-error');
        error_obj.hide();

        var selectedEmails = [];
        $('.bsk-gfblcv-form-entry-email:checked').each(function() {
            selectedEmails.push($(this).val());
        });

        var selectedList = $(this).parents('.bsk-gfblcv-form-entry-action-section').find('.bsk-gfblcv-form-entry-add-to-list-select').val();

        if (selectedEmails.length === 0) {
            error_obj.html('Please select at least one email.');
            error_obj.show();
            return false;
        }

        if (!selectedList) {
            error_obj.html('Please select a list.');
            error_obj.show();
            return false;
        }

        
        bsk_gfblcv_form_entry_add_to_list_ajax_function( $(this), selectedEmails, selectedList, 'EMAIL' );
        
    });

    $(document).on('click', '.bsk-gfblcv-form-entry-add-ip-to-list-select-save', function(e) {
        e.preventDefault();

        var error_obj = $(this).parents('.bsk-gfblcv-form-entry-action-section').find('.bsk-gfblcv-form-entry-add-to-list-error');

        var selectedEmails = [];
        var ip_value = $(this).data( 'ip' );

        if (!ip_value) {
            error_obj.html('No IP address found.');
            error_obj.show();
            return false;
        }
        selectedEmails.push(ip_value);

        var selectedList = $(this).parents('.bsk-gfblcv-form-entry-action-section').find('.bsk-gfblcv-form-entry-add-to-list-select').val();
        if (!selectedList) {
            error_obj.html('Please select a list.');
            error_obj.show();
            return false;
        }

        
        bsk_gfblcv_form_entry_add_to_list_ajax_function( $(this), selectedEmails, selectedList, 'IP' );
    });

    function bsk_gfblcv_form_entry_add_to_list_ajax_function( clicked_obj, selectedEmails, selectedList, listType ) {

        var nonce_val = clicked_obj.parents( '.bsk-gfblcv-form-entry-actions-container' ).find('.bsk-gfblcv-form-entry-add-to-list-save-ajax-nonce').val();
        var action_container = clicked_obj.parents('.bsk-gfblcv-form-entry-action-section');
        var error_obj = clicked_obj.parents('.bsk-gfblcv-form-entry-action-section').find('.bsk-gfblcv-form-entry-add-to-list-error');
        var success_obj = clicked_obj.parents('.bsk-gfblcv-form-entry-action-section').find('.bsk-gfblcv-form-entry-add-to-list-success');
        var ajax_loder_obj = clicked_obj.parent().find( ".bsk-gfbl-ajax-loader" );

        error_obj.hide();
        success_obj.hide();

        var data = {
            action: 'bsk_gfblcv_save_items_to_list', // WordPress AJAX action（如果是 WordPress）
            items: selectedEmails,
            list_id: selectedList,
            list_type: listType,
            nonce: nonce_val,
        };
    }

    $('.sui-accordion-item').on( "click", function() {
        const clickedItem = $(this);
        const timeoutDuration = 2000; // 2 seconds
        const checkInterval = 100; // Check every 100ms
        let timeElapsed = 0;
        
        if( !window.bsk_gfblcv_free_data || window.bsk_gfblcv_free_data == undefined ) {
            return;
        }
        
        // Start monitoring for the open class
        const monitoringInterval = setInterval(function() {
            timeElapsed += checkInterval;
            
            // Check if the item now has the open class
            if (clickedItem.hasClass('sui-accordion-item--open')) {
                clearInterval(monitoringInterval);
                processOpenItem(clickedItem);
            }
            // Stop monitoring after timeout
            else if (timeElapsed >= timeoutDuration) {
                clearInterval(monitoringInterval);
                // Optional: do something if timeout occurs
            }
        }, checkInterval);
    });
    
    function processOpenItem(clickedItem) {
        const contentRow = clickedItem.next('.sui-accordion-item-content.sui-accordion-item--open');
        if (!contentRow.length) return;
    
        const boxFooter = contentRow.find('.sui-box-footer');
        if (!boxFooter.length) return;
    
        // Remove existing actions container if present
        const existingContainer = boxFooter.prev('.bsk-gfblcv-form-entry-actions-container');
        if (existingContainer.length) {
            existingContainer.remove();
        }
    
        // Find all email addresses in the content
        const emailItems = [];
        contentRow.find('.sui-box-settings-slim-row').each(function() {
            const col2 = $(this).find('.sui-box-settings-col-2');
            if (col2.length) {
                const text = col2.text().trim();
                // Improved email regex that handles mailto links
                const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
                if (emailMatch && isValidEmail(emailMatch[0])) {
                    // Avoid duplicates
                    if (!emailItems.includes(emailMatch[0])) {
                        emailItems.push(emailMatch[0]);
                    }
                }
            }
        });

        // Create the select dropdown with dynamic options
        let selectOptionsHtml = '<option value="">Select a list...</option>';
        
        if (window.bsk_gfblcv_free_data && window.bsk_gfblcv_free_data.list_data) {
            const listData = window.bsk_gfblcv_free_data.list_data;
            
            for (const [groupLabel, items] of Object.entries(listData)) {
                selectOptionsHtml += `<optgroup label="${escapeHtml(groupLabel)}">`;
                
                items.forEach(item => {
                    selectOptionsHtml += `
                        <option value="${item.id}">
                            ${escapeHtml(item.title)}
                        </option>
                    `;
                });
                
                selectOptionsHtml += '</optgroup>';
            }
        }

        let addToListSaveAnchor = `<a href="javascript:void(0);" class="button bsk-gfblcv-form-entry-add-item-to-list-select-save">Save</a>`;

        if ( !window.bsk_gfblcv_free_data || window.bsk_gfblcv_free_data?.license_type == 'PERSONAL' || window.bsk_gfblcv_free_data?.license_type == 'CREATOR') {
            addToListSaveAnchor = '';
        }
        // Create the new container structure
        const actionsContainer = $(`
            <div class="bsk-gfblcv-form-entry-actions-container" style="padding:30px;">
                <h3>BSK Forms Blacklist Actions</h3>
                <div class="bsk-gfblcv-form-entry-action-section email-action-section">
                    <h4>Add Email to List</h4>
                    <ul class="bsk-gfblcv-email-list"></ul>
                    <div class="bsk-gfblcv-form-entry-list-container">
                        <p>
                            <select class="bsk-gfblcv-form-entry-add-to-list-select" style="width: 50%;">
                                ${selectOptionsHtml}
                            </select>
                        </p>
                        <p>
                            ${addToListSaveAnchor}
                        </p>
                        <p class="bsk-gfblcv-form-entry-add-to-list-error" style="color: #FF0000; display: none;"></p>
                        <p class="bsk-gfblcv-form-entry-add-to-list-success" style="color: #008800; display: none;"></p>
                    </div>
                </div>
                <input type="hidden" class="bsk-gfblcv-form-entry-add-to-list-save-ajax-nonce" value="${window.bsk_gfblcv_free_data?.ajax_nonce}">
            </div>
        `);
    
        // Add email checkboxes if we found valid emails
        if (emailItems.length > 0) {
            const emailList = actionsContainer.find('.bsk-gfblcv-email-list');
            emailItems.forEach(function(email) {
                emailList.append(`
                    <li>
                        <label>
                            <input type="checkbox" value="${escapeHtml(email)}" class="bsk-gfblcv-form-entry-email">
                            ${escapeHtml(email)}
                        </label>
                    </li>
                `);
            });
        }

        // Get entry ID from the clicked item
        const entryId = clickedItem.data('entry-id');

        // Add IP section if we have IP data for this entry
        if (window.bsk_gfblcv_free_data?.fmnt_entry_ips?.[entryId]) {
            const ipAddress = window.bsk_gfblcv_free_data.fmnt_entry_ips[entryId];
            
            // Generate IP lists options
            let ipListOptions = '<option value="">Select a IP list...</option>';
            if (window.bsk_gfblcv_free_data.ip_lists) {
                window.bsk_gfblcv_free_data.ip_lists.forEach(list => {
                    ipListOptions += `<option value="${list.id}">${escapeHtml(list.title)}</option>`;
                });
            }

            let addToListSaveAnchor = `<a href="javascript:void(0);" 
                                        class="button bsk-gfblcv-form-entry-add-ip-to-list-select-save" 
                                        data-ip="${escapeHtml(ipAddress)}">Save</a>`;
            if ( window.bsk_gfblcv_free_data.license_type == 'PERSONAL' || window.bsk_gfblcv_free_data.license_type == 'CREATOR') {
                addToListSaveAnchor = '';
            }

            const ipSection = $(`
                <div class="bsk-gfblcv-form-entry-action-section ip-action-section" style="margin-top: 40px;">
                    <h4>Add IP to List</h4>
                    <ul>
                        <li>IP Address: <b>${escapeHtml(ipAddress)}</b></li>
                    </ul>
                    <div class="bsk-gfblcv-form-entry-list-container">
                        <p>
                            <select class="bsk-gfblcv-form-entry-add-to-list-select" style="width: 50%;">
                                ${ipListOptions}
                            </select>
                        </p>
                        <p>
                            ${addToListSaveAnchor}
                            <span class="bsk-gfbl-ajax-loader" style="display: none;">
                                <img src="${window.bsk_gfblcv_free_data?.ajax_loader_url}">
                            </span>
                        </p>
                        <p class="bsk-gfblcv-form-entry-add-to-list-error" style="color: #FF0000; display: none;"></p>
                        <p class="bsk-gfblcv-form-entry-add-to-list-success" style="color: #008800; display: none;"></p>
                    </div>
                </div>
            `);

            actionsContainer.append(ipSection);


            let updateLicenseTypeStr = `
            <div class="bsk-gfblcv-tips-box" style="width: 50%;">
                <p>This feature requires a <span style="font-weight: bold;">BUSINESS</span>( or above ) license for the Pro version. </p>
                <p><a href="${window.bsk_gfblcv_free_data.settings_license_page_url}" target="_blank">Click here to buy a license</a></p>
            </div>`;

            actionsContainer.append(updateLicenseTypeStr);

        }

        // Insert before the footer
        boxFooter.before(actionsContainer);
    }
    
    // Email validation function
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Helper function to escape HTML
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

});
