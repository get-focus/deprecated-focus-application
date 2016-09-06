import React, {PureComponent, PropTypes} from 'react'
import isUndefined from 'lodash/isUndefined'
function _getScrollPosition(domNode) {
  const y = window.pageYOffset || document.documentElement.scrollTop;
  const x = window.pageXOffset || document.documentElement.scrollLeft;
  if(isUndefined(domNode)) {
      return { top: y, left: x };
  }
  const nodeRect = domNode.getBoundingClientRect();
  return { left: nodeRect.left + x, top: nodeRect.top + y };
}


function _getScrollingElement() {
    if(document.scrollingElement) {
        return document.scrollingElement;
    } else if(document.documentElement) {
        return document.documentElement;
    }
    return document.querySelector('body');
}

function isAtPageBottom(domNode) {
    return _getScrollPosition().top >= _getScrollingElement().scrollHeight - window.innerHeight;
}

function scrollTo(element, to, duration = 500) {
    if(isUndefined(element)) {
        window.scrollTo(0, to);
        return;
    }
    element.scrollTop = to;
}

export const ScrollConnector = Component => function ScrollComponent(props) {
    const {_behaviours: previousBehaviour = {}, ...otherProps} = props;
    const _behaviours =  {...previousBehaviour, scroll: true};
   return <Component
     {...otherProps}
     scrollingElement={_getScrollingElement}
     isAtPageBottom={isAtPageBottom}
     scrollTo={scrollTo}
     scrollPosition={_getScrollPosition}
     _behaviours={_behaviours}
   />
 };

export class ScrollTrigger extends PureComponent {
   constructor(props){
     super(props);
     const {scrollTargetSelector} = this.props;
     this.scrollTargetNode = (scrollTargetSelector && scrollTargetSelector !== '') ? document.querySelector(scrollTargetSelector) : window;
   }
   componentDidMount(){
     this.scrollTargetNode.addEventListener('scroll', this.handleScroll);
     this.scrollTargetNode.addEventListener('resize', this.handleScroll);
     this.handleScroll();
   }
   componentWillUnmount(){
     this.scrollTargetNode.removeEventListener('scroll', this.handleScroll);
     this.scrollTargetNode.removeEventListener('resize', this.handleScroll);
   }
   handleScroll =  () => {
     const {isExpanded, scrollPosition, triggerPosition, unExpandHeader, expandHeader} = this.props;
     const cursorTop = scrollPosition().top;
     if(!isExpanded && cursorTop < triggerPosition) expandHeader()
     else if(isExpanded && cursorTop > triggerPosition) unExpandHeader()
   }
   render(){
     return <div data-focus='scroll-trigger'>{this.props.children}</div>;
   }
 }

ScrollTrigger.defaultProps = {
  isExpanded: false,
  expandHeader: () => console.log('Depoly header'),
  unExpandHeader: () => console.log('unExpandHeader'),
  triggerPosition: 20
}
ScrollTrigger.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  expandHeader: PropTypes.func.isRequired,
  unExpandHeader: PropTypes.func.isRequired
}

 export default ScrollConnector(ScrollTrigger);
