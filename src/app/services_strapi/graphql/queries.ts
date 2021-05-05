import { gql } from '@apollo/client/core'

const ReducedThemesApi = gql`
query Themes {
    themes{
      id
      theme_name
      english_theme_name
      selected
      podcasts{
        id
        title
      }
      perspektives{
        id
        title
      }
      projekts{
        id
        title
      }
    }
}`;

// (
//   where: {language: "en"}
// )
// en_project{id title}

const ReducedProjectsApi = gql`
query Projects ($language: String!){
	projekts(
    where: {language: $language}
  ){
		id
		unit_type
    title
    name
		background_color
		add_to_unit_hub
		curatorial_intro
		curatorial_description
		GPT_folder_name
		custom_font_color
		en_equivalent{title unit_type}
  	de_equivalent{title unit_type}
    preview_image {id name caption width height formats url}
    perspektives{id unit_type title }
    podcasts{id unit_type title}
    themes{id theme_name english_theme_name}
    body{
      __typename
      ... on ComponentProjectRelatedInfoTitle{
        id
        title
        style {id width position hex_color_code padding offset_y}
      }
      ... on ComponentProjectRelatedInfoName{
        id
        name
        style {id width position hex_color_code padding offset_y}
      }
      ... on ComponentTextTypesParagraphWithImage{
        id
        paragraph 
        image {id name caption width height formats url}
      }
      ... on ComponentTextTypesSubhead{
        id 
        subhead}
      ... on ComponentTextTypesWhiteSpace{
        id
        distance_in_pixel
      }
      ... on ComponentTextTypesParagraphWithRelation{
        id
        paragraph
      	relation_to{
          id 
          title 
          description
          projekt {id title preview_image{url}} 
          perspektive {title preview_image{url}}
          podcast {id title episode_cover{url}} }
      }
      ... on ComponentTextTypesParagraphWithMachine{
        id
        paragraph
        seed
        output
      }
      ... on ComponentTextTypesParagraphPlain{
        id
        paragraph
      }
      ... on ComponentTextTypesIntro{
        id
        text
      }
      ... on ComponentImageTypesSingleImage{
        id
        image {id name caption width height formats url}
        style {id width position hex_color_code padding offset_y}
			}
      ... on ComponentImageTypesCoupleImages{
        id
      	image_left {id name caption width height formats url}
        image_right {id name caption width height formats url}
      }
      ... on ComponentImageTypesFullscreenImage{
        id
        image {id name caption width height formats url}
      }
      ... on ComponentTextTypesFreeText{
        id
      	text
        style {id width position hex_color_code padding offset_y}
      }
      ... on ComponentAddonJavascriptFileName{
        id
      	javascript_file_name
      }
      ... on ComponentAddonWebsite{
        id
        website_link
      	style {id width position hex_color_code padding offset_y}
      }
      ... on ComponentAddonHtmlCss{
        id
        add_html_css
      }
      ... on ComponentAddonMachinePerspective{
        id
        json_data
      }
    }
  }
}`;

const ReducedPerspectivesApi = gql`
query Perspectives ($language: String!){
	perspektives(
    where: {language: $language}
  ){
    id
		unit_type
    title
    author
		add_to_unit_hub
		en_equivalent{title unit_type}
  	de_equivalent{title unit_type}
    preview_image {id name caption width height formats url}
  	cover_image {id name caption width height formats url}
    projekts{id unit_type title }
    podcasts{id unit_type title}
    themes{id theme_name english_theme_name}
    body{
      __typename
      ... on ComponentTextTypesParagraphWithImage{
        id
        paragraph 
        image {id name caption width height formats url}
      }
      ... on ComponentTextTypesSubhead{
        id 
        subhead}
      ... on ComponentTextTypesWhiteSpace{
        id
        distance_in_pixel
      }
      ... on ComponentTextTypesParagraphWithRelation{
        id
        paragraph
      	relation_to{
          id 
          title 
          description
          projekt {id title preview_image{url}} 
          perspektive {title preview_image{url}}
          podcast {id title episode_cover{url}} }
      }
      ... on ComponentTextTypesParagraphWithMachine{
        id
        paragraph
        seed
        output
      }
      ... on ComponentTextTypesParagraphPlain{
        id
        paragraph
      }
      ... on ComponentTextTypesIntro{
        id
        text
      }
      ... on ComponentImageTypesSingleImage{
        id
        image {id name caption width height formats url}
        style {id width position hex_color_code padding offset_y}
			}
      ... on ComponentImageTypesCoupleImages{
        id
      	image_left {id name caption width height formats url}
        image_right {id name caption width height formats url}
      }
      ... on ComponentImageTypesFullscreenImage{
        id
        image {id name caption width height formats url}
      }
      ... on ComponentAddonJavascriptFileName{
        id
      	javascript_file_name
      }
      ... on ComponentAddonWebsite{
        id
        website_link
      	style {id width position hex_color_code padding offset_y}
      }
      ... on ComponentAddonHtmlCss{
        id
        add_html_css
      }
      ... on ComponentAddonMachinePerspective{
        id
        json_data
      }
    } 
  }
}`;

const ReducedPodcastsApi = gql`
query Podcasts ($language: String!){
	podcasts(
    where: {language: $language}
  ){
    id
    unit_type
    title
    speakers
    intro
    description
    moderator
    en_equivalent{title unit_type}
  	de_equivalent{title unit_type}
    episode_cover {id name caption width height formats url}
    offline_episode_logo {id name caption width height formats url}
    episode_id
    projekts{id unit_type title }
    themes{id theme_name english_theme_name}
    perspektives{id unit_type title} 
  }
}`;

export { ReducedThemesApi, ReducedProjectsApi, ReducedPerspectivesApi, ReducedPodcastsApi };