import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getChampsAction } from '../../store/actions/userActions'
import { getChampsFailAction } from '../../store/actions/userActions'

class ChampSelect extends Component {
    state = {
        searchBar: ''
    }

    componentDidMount() {

        const reqObj = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            }
        // console.log('------->', reqObj)

        fetch('http://localhost:3000/champs', reqObj)
        .then(res => res.json())
        .then(res => {
           
            // debugger
            if(res.error) {
                throw(res.error)
            }
            
         return  this.props.getChampsSuccess(res)
        })
        .catch((error) => {
            console.log('herer', error)
            this.props.getChampsFailure(error)
        })
    }

    clickedChamp = (target) => {
        // console.log('handle click champ', target)
        // console.log('handle click champ id', target.id)
        this.props.history.push(`/champ/${target.id}`)
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
      }
    
      updatedChampions = () => {
        return this.props.champs.filter(champ => 
          {return champ.name.toLowerCase().includes(this.state.searchBar.toLowerCase())}
        )
      }

    
      render(){

        const divStyle={
            overflowY: 'scroll',
            // border:'1px solid red',
            // width:'500px',
            // float: 'left',
            height:'450px',
            position:'relative'
        };

          // console.log('champ select props', this.props)
          const { champs } = this.props
          return(

              <div>
                <div className="ui huge fluid icon input">
                    <input type="text" id="searchBar" placeholder={"Champion search"} onChange={this.handleChange}/>
                    <i className="circular search link icon"></i>
                </div>
                <div class="ui hidden divider"></div>

                <div className="ui twelve cards" style={divStyle}>
                
                    {this.state.searchBar === '' ?
                        champs.map(champ => (
                        <div className="column">
                            <div className="ui animated inverted fade button">
                            {/* <div className="visible content"> */}
                                <img onClick={() => this.clickedChamp(champ)} src={champ.icon_img} alt={champ.name} className="ui visible content" />
                            {/* </div> */}
                                <div onClick={() => this.clickedChamp(champ)} className="hidden content">{champ.name}</div>
                            </div>
                </div>
                    ))
                    :
                        this.updatedChampions().map(champ => (
                        <div className="column">
                            <div className="ui animated fade button">
                            {/* <div className="visible content"> */}
                                <img onClick={() => this.clickedChamp(champ)} src={champ.icon_img} alt={champ.name} className="ui visible content fluid card" />
                            {/* </div> */}
                                <div onClick={() => this.clickedChamp(champ)} className="hidden content">{champ.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    }

{/* <div class="ui animated fade button" tabindex="0">
    <div class="visible content">Sign-up for a Pro account</div>
    <div class="hidden content">
    $12.99 a month
    </div>
</div> */}

    const mapStateToProps = (state) => {
        // console.log('champ select map state to props', state)
        return {
            champs: state.user.champs
        }
    }

    const mapDispatchToProps = (dispatch) => {
        // console.log('champ select map dispatch to props', dispatch)
        return {
            getChampsSuccess: (champs) => {
                dispatch(getChampsAction(champs))
            },
            getChampsFailure: (error) => {
                dispatch(getChampsFailAction(error))
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChampSelect))