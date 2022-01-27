/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware } from 'redux'
// 引入汇总之后的reducer
import reducer from './reducers'
// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
// 引入redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension'
// 引入redux-persist
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {  
	key: 'root', // 必须有的  
	storage:storageSession, // 缓存机制  
	// blacklist: ['loginStatus'] reducer 里不持久化的数据,除此外均为持久化数据  
	whitelist: ['status'] // reducer 里持久化的数据,除此外均为不持久化数据
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk))) 
export const persistor = persistStore(store)