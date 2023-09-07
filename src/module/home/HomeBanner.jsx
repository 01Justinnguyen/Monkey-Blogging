import {} from 'react'
import { styled } from 'styled-components'
import { Button } from '@/components/button'
const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(to right bottom, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary});
  margin-bottom: 60px;
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
`

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus dignissimos alias deleniti. Optio nihil quibusdam tempore nisi minus quis, dolore magni, omnis eveniet illo ipsa, fugit
              provident. Dolores, unde suscipit.
            </p>
            <Button type="button" to="/sign-in">
              Get Started
            </Button>
          </div>
          <div className="banner-img">
            <img srcSet="img-banner.png 2x" alt="banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  )
}

export default HomeBanner
