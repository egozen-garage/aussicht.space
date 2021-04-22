import { gql } from '@apollo/client/core'

const ReducedThemesApi = gql`
query Themes {
    themes{
      id
      theme_name
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
}
`
;

export { ReducedThemesApi };