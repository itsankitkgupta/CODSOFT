import { useState } from 'react';
import {combineReducers, legacy_createStore} from 'redux';

const cartfun=(state=0,action)=>{
         if(action.type==="GT")
         {
           return action.citem;
         }
        
         else{
            return state;
         }
}
const pricefun=(state=0,action)=>{
  if(action.type==="pr"){
    return action.pitem;
  }else{
    return state;
  }
}

const length=(state=0,action)=>{
  if(action.type==="le"){
     return action.len;
  }else{
    return state;
  }
}

const rootred=combineReducers({cartfun,pricefun,length});
const store=legacy_createStore(rootred);
export default store;
