import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {NavLink, Link, Redirect, Route, Switch} from 'react-router-dom'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import modelStyle from '../../model/style'
import Field from '../Field'
import Icon from '../Icon'
import StyleAdd from '../StyleAdd'
import Infotip from '../Infotip'

class HomeStyles extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			styleAddShown:false,
			searchShow:false,
			search:null
		}
	}

	handleChange = ()=>{

	}
	handleOnDragEnd = ()=>{

	}

	handleSearchChange = ({value})=>{
		this.setState({
			search: value,
		})
	}

	handleSearchShowSet = ({show})=>{
		this.setState({
			searchShow: show,
		})
	}

	render (){
		const {styles} = this.props,
			{search, searchShow} = this.state

		const handle = {
			change: this.handleSearchChange
		}

		return (
			<div className="content-body content-body-flex">
				<div className="content-body-left">
					{searchShow ? 
						<div className="d-flex p-1">
							<div className="property flex-fill">
								<Field
									autoFocus={true}
									handle={handle}
									name={'search'}
									placeholder={'Search for style'}
									inputClass={'form-control-sm font-sm'}
									inputNoAC={true}
									type={'string'}
									value={search}
								 />
							</div>
							<div className="search-option" onClick={()=>this.handleSearchShowSet({show:false})}>
								<Icon icon={'close'}/>
							</div>
						</div>
						:
						<h2 className="content-title content-title-sub clearfix">
							<span className="content-title-label text-overflow-ellipsis">
								Styles ({styles? styles.size: 0})
							</span>
							<div className="content-title-options">
								<span onClick={()=>this.handleSearchShowSet({show:true})} className={'content-title-option interactive infotip-trigger'}>
									<Icon icon={'search'}/>
									<Infotip direction={'y'} message={'search'}/>
								</span>
								<Link to={`/styles/add`} className={'content-title-option interactive infotip-trigger'}>
									<Icon icon={'add'}/>
									<Infotip direction={'y'} message={'add style'}/>
								</Link>
							</div>
						</h2>
					}
					{this.renderList()}
				</div>
				{this.renderRight()}
			</div>
		)
	}

	renderList (){
		const {styles} = this.props,
			{search} = this.state 

		if (!styles){
			return <div/>
		}

		let ind = -1

		return (
			<div className="">
				<DragDropContext onDragEnd={this.handleOnDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div ref={provided.innerRef}>
								{styles !== undefined && styles.keySeq().map((styleId)=>{

									const style = styles.get(styleId)
									
									if (!style.has) return <div/>

									if (search && styleId.toLowerCase().indexOf(search.toLowerCase()) === -1) return <div/>

									let className = 'content-body-left-row row-icons '
									//if (error && error.hasIn(['styles',i])) className += ' error'

									const name = style.getIn(['current','name']) || styleId

									ind++

									return <Draggable key={styleId} draggableId={styleId} index={ind}>
										{(provided, snapshot) => (
											<NavLink key={styleId} to={`/style/${styleId}`} className={className} ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>

													<div className="row-icon-left">
														<Icon className="md-shadow" icon={'style'}/>
													</div>
													{name}
											</NavLink>
										)}
									</Draggable>
								})}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		)
	}

	renderRight (){
		return (
			<div className="content-body-right">
				<Switch>
					<Route path={'/styles/add'} 
						render={(props) => <StyleAdd {...props}/>}/>
					<Redirect to={`/styles/add`}/>
				</Switch>
			</div>
		)
	}
}


HomeStyles.propTypes = {
	error: PropTypes.object,
	styles: PropTypes.object,
	match: PropTypes.object,
}

const mapStateToProps = (state, props) => {
	return {
		styles: modelStyle.selectors.get(state),
	}
}
export default connect(
  mapStateToProps,{}
)(HomeStyles)
