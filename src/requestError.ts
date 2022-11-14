export class RequestErrorType extends Error implements RequestError
{
	constructor( private _id: string, message?: string )
	{
		super( message )
	}

	get id(): string
	{
		return this._id
	}
}