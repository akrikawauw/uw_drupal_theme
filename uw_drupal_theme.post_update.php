<?php

/**
 * @file
 * Post update functions for UW Drupal Theme.
 */

/**
 * Modifies UW Drupal Theme config variables to allow smoother implementation
 * for subthemes.
 */
function uw_drupal_theme_post_update_91012() {
  $config = \Drupal::service('config.factory')->getEditable('uw_drupal_theme.settings');
  // if ($config->get('uw_drupal_theme_hero_image_front_default_path')) { 
  //   $config->set('hero_image_front_default_path', $config->get('uw_drupal_theme_hero_image_front_default_path'))
  //   ->clear('uw_drupal_theme_hero_image_front_default_path');
  // }
  // if ($config->get('uw_drupal_theme_hero_image_front_default')) { 
  //   $config->set('hero_image_front_default_path', $config->get('uw_drupal_theme_hero_image_front_default'))
  //   ->clear('uw_drupal_theme_hero_image_front_default');
  // }
  $config_keys = array(
    'uw_drupal_theme_hero_front_button_text', 'uw_drupal_theme_hero_front_button_link', 'uw_drupal_theme_hero_image_front_default_path'
  );
  foreach ($config_keys as $key) {
    $new_key = str_replace('uw_drupal_theme_', '', $key);
    // print_r($new_key);
    if ($config->get($key) > '') {
      // Set the new key with the value from the existing key, then clear the existing key.
      $config->set(($new_key), $config->get($key))->clear($key)->save();
    }
  }
}

/*
_core:
  default_config_hash: x3pdJpQ1OFTLO84jhQR_v6B5ZXp3QENxAGPj9d4qKss
favicon:
  use_default: true
features:
  comment_user_picture: true
  comment_user_verification: true
  favicon: true
  node_user_picture: true
logo:
  use_default: true
uw_drupal_theme_hero_image_front_default_path: /assets/headers/suzzallo.jpg
uw_drupal_theme_hero_image_front_default: 1
uw_drupal_theme_hero_image_front_path: ''
uw_drupal_theme_hero_image_front_mobile_path: ''
uw_drupal_theme_hero_front_banner: ''
uw_drupal_theme_hero_front_button_text: 'Updated by theme'
uw_drupal_theme_hero_front_button_link: 'https://www.google.com'
uw_drupal_theme_hero_front_subhead_text: ''
uw_drupal_theme_hero_front_title_below: 1
uw_drupal_theme_hero_image_other_default_path: /assets/headers/suzzallo.jpg
uw_drupal_theme_hero_image_other_default: 1
uw_drupal_theme_hero_image_other_path: ''
uw_drupal_theme_hero_image_other_mobile_path: ''
uw_drupal_theme_hero_other_banner: ''
uw_drupal_theme_hero_other_button_text: ''
uw_drupal_theme_hero_other_button_link: ''
uw_drupal_theme_hero_other_subhead_text: ''
uw_drupal_theme_hero_other_title_below: 0
uw_drupal_theme_hero_template_front: small_hero
uw_drupal_theme_hero_template_other: default
uw_drupal_theme_long_site_name: 0
uw_drupal_theme_front_page_title_color: '#ffffff'
uw_drupal_theme_front_page_slant_color: '#ffffff'
uw_drupal_theme_front_page_slogan_color: '#ffffff'
uw_drupal_theme_text_shadow_black: '1px 1px 3px rgba(0, 0, 0, 0.5)'
uw_drupal_theme_text_shadow_white: '1px 1px 3px rgba(255, 255, 255, 0.5)'
uw_drupal_theme_sidebar_menu_visibility: '1'
uw_drupal_theme_top_links_to_dropdowns: 1
uw_drupal_theme_login_url: /user/login
uw_drupal_theme_hero_image_front_upload: {  }
uw_drupal_theme_hero_image_front_mobile_upload: {  }
uw_drupal_theme_hero_image_default: 0
uw_drupal_theme_hero_image_other_upload: {  }
uw_drupal_theme_hero_image_other_mobile_upload: {  }
uw_drupal_theme_front_sass_page_slogan_color: '#ffffff'
uw_drupal_theme_search_toggle_option: uw
hero_image_front_default_path: badabada
*/





// // Set all values.
// \Drupal::service('config.factory')->getEditable('system.performance')->setData([
//   'hero_image_front_default_path' => [
//     'this'
//   ],
// ])
// ->save();