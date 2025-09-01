<?php
if ( ! class_exists( 'BSK_GFBLCV' ) ) {
	die();
}

/**
 * Class BSKCommon
 *
 * Includes common methods for all BSK WordPress plugins.
 */
class BSK_FormsBlacklist_Free_Common {
    
	public static function sanitize_text_field( $str, $keep_whitespaces = true, $keep_newlines = false ){
        if ( is_object( $str ) || is_array( $str ) ) {
            return '';
        }

        $str = (string) $str;

        $filtered = wp_check_invalid_utf8( $str );

        if ( strpos( $filtered, '<' ) !== false ) {
            $filtered = wp_pre_kses_less_than( $filtered );
            // This will strip extra whitespace for us.
            $filtered = wp_strip_all_tags( $filtered, false );

            // Use html entities in a special case to make sure no later
            // newline stripping stage could lead to a functional tag
            $filtered = str_replace( "<\n", "&lt;\n", $filtered );
        }

        if ( ! $keep_newlines ) {
            $filtered = preg_replace( '/[\r\n\t ]+/', ' ', $filtered );
        }
        
        if ( ! $keep_whitespaces ) {
            $filtered = trim( $filtered );
        }

        $found = false;
        while ( preg_match( '/%[a-f0-9]{2}/i', $filtered, $match ) ) {
            $filtered = str_replace( $match[0], '', $filtered );
            $found    = true;
        }

        if ( $found ) {
            // Strip out the whitespace that may now exist after removing the octets.
            $filtered = trim( preg_replace( '/ +/', ' ', $filtered ) );
        }

        return $filtered;
    }

    public static function bsk_gfblcv_extract_emails_from_string( $string ) {

        if ( trim( $string ) == '' ) {
            return false;
        }

        $pattern = '/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/';
        
        $matched_num = preg_match_all($pattern, $string, $matches);
        if ( ! $matched_num ) {
            return false;
        }
        
        return $matches[0];
    }
}
