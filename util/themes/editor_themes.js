import {createGlobalStyle} from 'styled-components';

const GlobalStylesDark = createGlobalStyle`
 body {
   
  --primary-dark-color:#181818;

  --body_scroll_bar_track: #121212;
  --body_scroll_bar_thumb: #424242;
  --body_scroll_bar_thumb-hover: #626262;


  --body_head_back_color:#242424;
  --body_head_txt_color:#080808;
  --body_head_bord_color:#323232;
  --body_head_int_fld_color:#fff;
  --body_head_logo_name_color:#fff;
  --body_head_butt_back_txt_color:#fff;
  --body_head_butt_back_color:#454545;


  --body_brow_back_color:#0E98FF;
  --body_brow_ard_bar_back_color:#0E98FF;
  --body_brow_ard_lnk_color:#fff;
  --body_brow_ard_butt_color:#fff;

  --left_pane_back_color: var(--primary-dark-color);
  --left_pane_butt_back_color: var(--primary-dark-color);
  --left_pane_butt_ico_color: #929292;
  --left_pane_butt_back_color-hover: #212121;

  --right_pane_back_color: #242424;
  --right_pane_butt_back_color: #454545;
  --right_pane_head_text_color: #fff;
  --right_pane_text_color: #5E5E5E;
  --right_pane_acord_head_back_color: #222222;
  --right_pane_butt_ico_color: #fff;
  --right_pane_down_arrow_color:#828282;
  --right_pane_butt_back_color-hover: #212121;
  --right_pane_border_color: #383838;
  --right_pane_acord_back_color:#262626;
  --right_pane_opt_butt_back_color:#424242;
  --right_pane_opt_butt_back_color_hover:#626262;
  --right_pane_txt_int_fld_color: #525252;

  --right_pane_joint_fld_back_color:#424242;
  --right_pane_joint_fld_label_color:#e0e0e0;
  --right_pane_joint_fld_txt_color:#fff;
  --right_pane_nav_back_color:#383838;
  --right_pane_nav_selected_back_color:#525252;



  --layer_menu_back_color:#252525;
  --layer_menu_head_color:#525252;
  --layer_menu_head_text_color: var(--right_pane_head_text_color);
  --layer_menu_txt_color:#e0e0e0;
  --layer_menu_close_back_color:#525252;  
  --layer_menu_close_ico_color:#212112;  

  --slider_back_color: #424242;
  --slider_bar_color: #0E98FF;
  --slider_text_color: #fff;


  --context_menu_back_color:#212121;
  --context_menu_butt_back_color_hover:#424242;
  --context_menu_text_color:#e0e0e0;
  --context_menu_ico_color:#e0e0e0;

  --pop_back_color:#282828;
  --pop_head_txt_color:#727272;
  --pop_txt_color:#fff;

 }
`;
const GlobalStylesLight = createGlobalStyle`
 body {
   
  --primary-dark-color:#fff;

  --body_scroll_bar_track: #121212;
  --body_scroll_bar_thumb: #424242;
  --body_scroll_bar_thumb-hover: #626262;


  --body_head_back_color:#FFFFFF;
  --body_head_txt_color:#000;
  --body_head_bord_color:#e0e0e0;
  --body_head_int_fld_color:#000;
  --body_head_logo_name_color:#000;
  --body_head_butt_back_color:#e0e0e0;
  --body_head_butt_back_txt_color:#000;


  --body_brow_back_color:#0E98FF;
  --body_brow_ard_bar_back_color:#0E98FF;
  --body_brow_ard_lnk_color:#fff;
  --body_brow_ard_butt_color:#fff;

  --left_pane_back_color: var(--primary-dark-color);
  --left_pane_butt_back_color: var(--primary-dark-color);
  --left_pane_butt_ico_color: #929292;
  --left_pane_butt_back_color-hover: #212121;

  --right_pane_back_color: #fff;
  --right_pane_butt_back_color: #e0e0e0;
  --right_pane_head_text_color: #000;
  --right_pane_text_color: #bdbdbd;
  --right_pane_acord_head_back_color: #fff;
  --right_pane_butt_ico_color: #000;
  --right_pane_down_arrow_color:#000;
  --right_pane_butt_back_color-hover: #e0e0e0;
  --right_pane_border_color: #f1f1f1;
  --right_pane_acord_back_color:#f8f8f8;
  --right_pane_opt_butt_back_color:#e0e0e0;
  --right_pane_opt_butt_back_color_hover:#626262;
  --right_pane_txt_int_fld_color: #f1f1f1;

  --right_pane_joint_fld_back_color:#e0e0e0;
  --right_pane_joint_fld_label_color:#000;
  --right_pane_joint_fld_txt_color:#000;
  --right_pane_nav_back_color:#383838;
  --right_pane_nav_selected_back_color:#525252;



  --layer_menu_back_color:#252525;
  --layer_menu_head_color:#525252;
  --layer_menu_head_text_color: var(--right_pane_head_text_color);
  --layer_menu_txt_color:#e0e0e0;
  --layer_menu_close_back_color:#525252;  
  --layer_menu_close_ico_color:#212112;  

  --slider_back_color: #424242;
  --slider_bar_color: #0E98FF;
  --slider_text_color: #fff;


  --context_menu_back_color:#212121;
  --context_menu_butt_back_color_hover:#424242;
  --context_menu_text_color:#e0e0e0;
  --context_menu_ico_color:#e0e0e0;

  --pop_back_color:#282828;
  --pop_head_txt_color:#727272;
  --pop_txt_color:#fff;

 }
`;

export {GlobalStylesLight,GlobalStylesDark}