<?php
/**
 * The template for displaying all single pages.
 *
 * @package BWE Service
 * @since   BWE Service 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

while ( have_posts() ) :
    the_post();

    $content = apply_filters( 'the_content', get_the_content() );
    $use_new_layout = get_post_meta( get_the_ID(), 'bwe_use_new_layout', true );

    if ( is_user_logged_in() && $use_new_layout ) {
        require_once(ABSPATH . 'wp-load.php');

        wp_enqueue_style('admin-bar');
        wp_enqueue_script('admin-bar');

        wp_print_styles();
        wp_print_scripts();

        wp_admin_bar_render();
    }

    if ( $use_new_layout ) {
        echo $content;
        exit;
    }

endwhile;

get_header();

while ( have_posts() ) :
    the_post();

    $content = apply_filters( "the_content", get_the_content() );
        
    $has_custom_page_layout = get_post_meta($post->ID, 'bwe_has_custom_page_layout', true);
    if ( $has_custom_page_layout ) {
        echo $content;
    } else if ( is_active_sidebar( 'bwe-service-page-sidebar' ) ) {

        bwe_service_get_widget_sidebar( 'bwe-service-page-sidebar' );

    } else {
        ?>
        <div class="container all-page">
            <div class="page-title">
                <h1><?php the_title(); ?></h1>
                <span class="post-date"><?php echo get_the_date(); ?></span>
            </div>
            <div class="page-content">
                <?php echo $content; ?>
            </div>
        </div>
        <?php
    }

endwhile;

get_footer();