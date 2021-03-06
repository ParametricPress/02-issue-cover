import React from 'react';
import ARTICLES from '../data/articles.json';

const formatTitle = (title) => {
  return title.reduce((memo, str, i) => {
    if (i < title.length - 1) {
      return memo.concat([<span key={str}>{str}</span>, <br key={i} />]);
    }
    return memo.concat([<span key={str}>{str}</span>]);
  }, [])
}

class Nav extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleContents = this.handleContents.bind(this);
    this.state = {
      showContent: false
    }
  }

  handleContents() {
    this.setState({
      showContent: !this.state.showContent
    });
  }

  render() {
    return (
      <div className="parametric-article-nav">
          <div>
          <div style={{ fontFamily: 'Graphik Web', textDecoration: 'none'}}>Parametric Press</div>
          </div>
          <div className="parametric-nav-links" style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            fontFamily: 'Graphik Web',
            textDecoration: 'none',
            color: '#D8FFA2'
          }}>
            <a href="/" style={{color: '#D8FFA2'}}>
              The Climate Issue
            </a>
          </div>
          <div className="parametric-issue-toc" style={{
            // display: this.state.showContent ? 'block' : 'none',
            position: 'fixed',
            width: 500,
            right: this.state.showContent ? 0 : -500,
            top: 0,
            bottom: 0,
            padding: '1em',
            paddingTop: '2em',
            background: '#FFE533',
            overflow: 'auto',
            maxWidth: '100vw',
            zIndex: 999,
            transition: 'all 0.75s'
            }}>
            <div onClick={this.handleContents} style={{ cursor: 'pointer', textAlign: 'right', textDecoration: 'underline', fontFamily: 'Graphik Web', marginBottom: '1em' }}>
              Table of Contents
            </div>
            {
              ARTICLES.map(({title, titleBreaks, slug, author}, i) => {
                return (
                <div style={{textAlign: 'right'}} key={slug}>
                  <div style={{marginBottom: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <div>
                      <div style={{fontFamily: 'Graphik Web', fontWeight: 500}}>
                        <a style={{color: '#222'}} href={`/issue-02/${slug}/`}>{formatTitle(titleBreaks)}</a>
                      </div>
                      <div style={{fontStyle: 'italic', fontWeight: 400, fontFamily: 'Graphik Web'}}>
                        {author}
                      </div>
                    </div>
                    <div style={{marginLeft: '1em', fontFamily: 'Graphik Web', fontWeight: 500}}>
                      0{i + 1}
                    </div>
                  </div>
                </div>
                )
              })
            }
            <div style={{textAlign: 'right'}}>
              <div style={{marginTop: '2em', marginBottom: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <div style={{fontFamily: 'Graphik Web', fontWeight: 500}}>
                  <a style={{color: '#222'}} href={`/about/`}>About Us</a>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
export default Nav;
