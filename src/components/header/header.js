import React from 'react'
import {Link} from 'react-router-dom'

const Header=()=>{
    return(
        <div className='d-flex justify-content-around'>
            <Link to='/converter'><button type="button" className="btn btn-link">Converter</button></Link>
            <Link to='/exchangeRates'><button type="button" className="btn btn-link">Сurrent Exchange Rate</button></Link>
        </div>
    )
}
export default Header;