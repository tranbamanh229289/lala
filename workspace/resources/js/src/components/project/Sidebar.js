import React, { memo, useState, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { deleteProjectSuccess } from "../../redux/actions/projectsAction";
import FormOperation from "./FormOperation";


function Sidebar({ projects, handleAddProject }){
    return (
        <div className="sidebar">
            <div className="workspace">
                <div></div>
                <p>WorkSpace</p>
            </div>
            <hr/>
            <div className="new-project">
                <p>New Project</p>
                <i className="fas fa-plus" onClick={handleAddProject}></i>
            </div>
            <div className="list-projects">
                {projects.map((item, index)=>
                    <div  key={index}>
                        <NavLink className="project d-flex justify-content-between align-items-center"
                                 to={`/workspace/${item.id}` }
                                 activeClassName="active">{item.name}
                            <div>...</div>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    )
}
export default memo(Sidebar);
