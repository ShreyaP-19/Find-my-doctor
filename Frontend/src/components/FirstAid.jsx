import React from 'react'
import HomeHeader from './HomeHeader'
import './firstaid.css'

function FirstAid() {
  return (
    <div>
      <HomeHeader/>
      <h1 id="head">First Aid</h1>
      <div id="paragraph">
      <div id="quote">Empower yourself with first-aid knowledge and make a difference when it matters the most</div>
      {/* <div className="searchHospdiv">
          <div id="hospdiv"  style={{height:"150px",backgroundColor:"white"}}> </div>
      </div> */}
      </div>
    </div>
  )
}

export default FirstAid
