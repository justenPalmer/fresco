import PropTypes from 'prop-types'
import React from 'react'
import {Map} from 'immutable'
import {NavLink, Redirect, Route, Switch, withRouter} from 'react-router-dom'

import Icon from '../Icon'
import StyleAddJson from './StyleAddJson'
import StyleAddScratch from './StyleAddScratch'
import StyleAddUpload from './StyleAddUpload'
import Infotip from '../Infotip'

class StyleAdd extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			headers: Map({}),
			id: '',
			makeLayers: false,
			type: '',
			url: '',
		}
	}

	render (){
		const {match} = this.props

		return <div>
			<h2 className="content-title content-title-sub content-title-light">
				<span className="content-title-label">Add Style</span>

				<div className="content-title-options">
					<NavLink to={`${match.url}/scratch`} className={'content-title-option interactive infotip-trigger'}>
						<Icon icon={'scratch'}/>
						<Infotip direction={'y'} message={'from scratch'}/>
					</NavLink>
					<NavLink to={`${match.url}/upload`} className={'content-title-option interactive infotip-trigger'}>
						<Icon icon={'upload'}/>
						<Infotip direction={'y'} message={'from upload'}/>
					</NavLink>
					<NavLink to={`${match.url}/json`} className={'content-title-option interactive infotip-trigger'}>
						<Icon icon={'code'}/>
						<Infotip direction={'y'} message={'from json'}/>
					</NavLink>
				</div>
			</h2>

			{this.renderBody()}
		</div>
	}

	renderBody(){
		const {match} = this.props

		const redirect = `${match.url}/scratch`

		return (
			<Switch>
				<Route path={`${match.url}/scratch`} 
					render={(props) => (
						<StyleAddScratch 
							{...props}
						/>
					)}/>
				<Route path={`${match.url}/upload`} 
					render={(props) => (
						<StyleAddUpload 
							{...props}
						/>
					)}/>
				<Route path={`${match.url}/json`} 
					render={(props) => (
						<StyleAddJson 
							{...props}
						/>
					)}/>
				<Redirect to={redirect}/>
			</Switch>
		)
	}
}

StyleAdd.propTypes = {
	handle: PropTypes.object,
	history: PropTypes.object,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(StyleAdd)