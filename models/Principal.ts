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
	fromFirestore: (snapshot: any, options: any) => {
		const data = snapshot.data(options);
		return new Principal(data.name, data.email);
	}
};