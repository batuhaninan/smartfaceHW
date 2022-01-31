import {ColorEnum, IconEnum, StatusEnum} from "../constants/StatusToColor";

export const convertStatusToEnum = (status: string) => {
	if (status === "IN_PROGRESS") {
		return StatusEnum.IN_PROGRESS
	}

	if (status === "DONE") {
		return StatusEnum.DONE
	}
}

export const statusToColor = (status: StatusEnum) => {
	return ColorEnum[status]
}

export const statusToIcon = (status: StatusEnum) => {
	return IconEnum[status]
}
