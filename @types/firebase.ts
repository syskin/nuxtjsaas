import { WhereFilterOp } from "firebase/firestore"

export type Filter = {
    key: string
    operator: WhereFilterOp
    value: string | number
}

export type Filters = Filter[]