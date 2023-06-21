import React, { useContext, useEffect, useRef , useImperativeHandle} from 'react';
import SharedValuesContext from '../SharedStuff/SharedVariables';
import logo from '../style/logo/My project.png'
import '../style/styles.css'


const Child = React.forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
      childMethod() {
        printChild()
      }
    }))
  
    function printChild() {
      console.log('call me')
    }
  
    return (<h1>okay</h1>)
  })

export default Child;