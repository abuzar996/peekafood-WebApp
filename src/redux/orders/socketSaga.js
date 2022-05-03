
import {eventChannel, END} from 'redux-saga';
import {take, call, put, fork,cancel, cancelled} from 'redux-saga/effects';
import {  GET_ORDERS_FROM_CHANNEL,
    STOP_ORDERS_FROM_CHANNEL,
    } from "../actions";
    import {
        orderIncomingSuccessFromChannel
      } from "./actions";
import { BASE_URL } from "../../../src/API";
import _ from 'lodash'

const makeUrl = (object) => {
  var temp = '';
  let url = `${BASE_URL}`.split(":");
  if(BASE_URL === "http://api.peekafood.com" || BASE_URL === "https://api.peekafood.com"){
    
    if(object.section){
        temp = `ws:${url[1]}/ws/orders_ws/${Math.random().toString(36).slice(2)}/?branch_id=${object.branch_id}&section=${object.section}&order_type=${object.order_type}&order_status=${object.status}`
    }
    else{
        temp = `ws:${url[1]}/ws/orders_ws/${Math.random().toString(36).slice(2)}/?branch_id=${object.branch_id}&order_type=${object.order_type}&order_status=${object.status}`
    }
    
    
  }else{
    if(object.section){
        temp = `ws:${url[1]+`:`+url[2]}/ws/orders_ws/${Math.random().toString(36).slice(2)}/?branch_id=${object.branch_id}&section=${object.section}&order_type=${object.order_type}&order_status=${object.status}`
    }
    else{
        temp = `ws:${url[1]+`:`+url[2]}/ws/orders_ws/${Math.random().toString(36).slice(2)}/?branch_id=${object.branch_id}&order_type=${object.order_type}&order_status=${object.status}`
    }
  }
  return temp
    
}

function createWebSocketConnection(url) {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(url);
  
      socket.onopen = function () {
         
          socket.send("acknowledged")
        resolve(socket);
      };
  
      socket.onerror = function (evt) {
        reject(evt);
      }
    });
  }
  
  function createWebSocketChannel(socket) {
  
    return eventChannel(emit => {
      socket.onmessage = (event) => {
          socket.send("acknowledged")
        emit(JSON.parse(event.data))
      };
  
      socket.onclose = () => {
          //console.log("ending now")
        emit(END);
        
      };
  
      const unsubscribe = () => {
        socket.onmessage = null;
      };
  
      return unsubscribe;
    });
  }
function* listenForSocketMessages(object) {
    const url = yield call(makeUrl,object.payload);
    let socket;
    let socketChannel;
  
    try {
   
      socket        = yield call(createWebSocketConnection,url);
      socketChannel = yield call(createWebSocketChannel, socket);
  
      // tell the application that we have a connection
      //yield dispatch(LiveDataActions.connectionSuccess());
    
    //   const {timeout} = yield race({
    //     connected: call(createWebSocketConnection,url),
    //     timeout: delay(2000),
    //   });
    //   if (timeout) {
    //     console.log("conecttion timedOut")
    //   }
      while (true) {
          
        // wait for a message from the channel
        const payload = yield take(socketChannel);
        if(!_.isEmpty(payload)){
       
        // a message has been received, dispatch an action with the message payload
        yield put(orderIncomingSuccessFromChannel(payload));
        }
      }
    } catch (error) {
      //yield dispatch(LiveDataActions.connectionError('Error while connecting to the WebSocket'));
      console.log('error');
      alert("Error occured while connecting the server");
      yield call(listenForSocketMessages,object)
      //yield put({type:STOP_ORDERS_FROM_CHANNEL})
      
    } finally {
      if (yield cancelled()) {
        // close the channel
        //console.log(socket,socketChannel)
        socketChannel.close();
  
        // close the WebSocket connection
        socket.onclose();
        //yield put({type:STOP_ORDERS_FROM_CHANNEL})
        //window.location.reload()
      } else {
        //yield dispatch(LiveDataActions.connectionError('WebSocket disconnected'));
        console.log('disconnected')
      }
    }
  }
// saga listens for start and stop actions
export function* startStopChannel() {
while(true){
    const action = yield take(GET_ORDERS_FROM_CHANNEL)
      // starts the task in the background
         const socketTask = yield fork(listenForSocketMessages,action);
         
  // when DISCONNECT action is dispatched, we cancel the socket task
  yield take(STOP_ORDERS_FROM_CHANNEL);
  yield cancel(socketTask); 
}
    
    
          

};