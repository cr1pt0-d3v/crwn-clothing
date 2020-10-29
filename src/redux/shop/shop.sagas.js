import { takeLatest, call, put, all } from "redux-saga/effects";
import ShopActionsTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { fetchCollectionsFailure, fetchCollectionsSucces } from "./shop.actions";

export function* fetchCollectionsAsync(){
try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSucces(collectionsMap));
    } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
    };
};
export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionsTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
};

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)]);
}