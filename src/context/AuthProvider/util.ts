import { Api } from "../../services/api"
import { IUser } from "./types"

export function SetUserLocalStorage (user: IUser | null) {
	localStorage.setItem('u', JSON.stringify(user))
}

export function GetUserLocalStorage () {
	const json = localStorage.getItem('u')

	if (!json) {
		return null
	}

	const user = JSON.parse(json)

	return user ?? null
}

export async function LoginRequest (email: string, password: string) {
    try {
      const request = await Api.post('login', {email, password})
      return request.data
    } catch (error) {
      	return null 
    }
}