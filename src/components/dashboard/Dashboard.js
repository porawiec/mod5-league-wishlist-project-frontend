import React, { Component } from 'react'
// import Notifications from './Notifications'
import ChampSelect from '../champ/ChampSelect'
import Wishlist from '../champ/Wishlist'

class Dashboard extends Component {

    render(){
        console.log('dash props',this.props)

        return(
        <div>
            <div className="ui divided two column">
                <div className="row">

                    <div className="ui two column grid">
                        
                        <div className="column">
                            <div className="ui segment">
                                Personal Wishlist
                                <Wishlist />
                            </div>
                        </div>

                        <div className="four wide column">
                            <div className="ui segment">
                                Friend Notifications
                                <img src="https://react.semantic-ui.com/images/wireframe/paragraph.png" className="ui image" />
                            </div>
                        </div>

                    </div>

                    <div className="four wide column">
                        <div className="ui segment">
                            Friends List
                            <img src="https://react.semantic-ui.com/images/wireframe/paragraph.png" className="ui image" />
                        </div>
                    </div>

                </div>

            </div>
                <div className="stretched row">
                    <div className="twelve wide column">
                        <div className="ui segment">
                            Roster of Champions
                            <ChampSelect />
                        </div>
                    </div>
                </div>
            
        </div>
        )
    }
}

export default Dashboard