const React = require('react');
const D3Component = require('idyll-d3-component');

class CustomD3Component extends D3Component {
  initialize(node, props) {
    this._props = props;
    this.timeout = setInterval(() => {
      const selectedIndex = (this._props.selectedIndex + 1) % this._props.articles.length;
      this.props.updateProps({
        selectedIndex: selectedIndex,
        selectedArticle: this._props.articles[selectedIndex].slug
      })
    }, 2500);
  }

  update(props, oldProps) {
    this._props = props;
    if (props.cancelTimeout) {
      clearInterval(this.timeout);
      this.timeout = setTimeout(() => {
        this.props.updateProps({
          cancelTimeout: false
        })
        this.timeout = setInterval(() => {
          const selectedIndex = (this._props.selectedIndex + 1) % this._props.articles.length;
          this.props.updateProps({
            selectedIndex: selectedIndex,
            selectedArticle: this._props.articles[selectedIndex].slug
          })
        }, 2500);
      }, 7000)

    }
  }
}

module.exports = CustomD3Component;
