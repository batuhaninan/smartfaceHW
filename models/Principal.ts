import {SnapshotOptions} from "firebase/firestore";
import {QueryDocumentSnapshot} from "firebase/firestore";

export class Principal {

	name: string
	email: string

	constructor (name: string, email: string) {
		this.name = name;
		this.email = email;
	}

	toString() {
		return "Principal " + this.name;
	}
}

export const PrincipalConverter = {
	toFirestore: (principal: Principal) => {
		return {
			name: principal.name,
			email: principal.email,
		};
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
		const data = snapshot.data(options);
		return new Principal(data.name, data.email);
	}
};