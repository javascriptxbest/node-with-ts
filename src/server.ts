import { LogSystem } from "./logSystem"
import Fastify, { FastifyInstance } from 'fastify'
import { SubscriberHandler } from "./subscriberHandler"

export class Server implements RequestObservable, Observer<ResponseInfo>
{
	private _log: LogSystem

	private server: FastifyInstance

	private responses: Record<string, {resolve: ( response: string ) => void; reject: () => void}>

	public onRequest: SubscriberHandler<RequestInfo>

	constructor( private port: number, private isTest: boolean, private logFile?: string )
	{
		this._log = new LogSystem( this.logFile )

		this.responses = {}

		this.onRequest = new SubscriberHandler()

		if ( this.isTest ) this.info( `You're running the server in TEST mode.` )

		this.server = Fastify( {
			logger: { stream: this._log.logDestination },
			forceCloseConnections: true } )

		this.destroy = this.destroy.bind( this )

		this.setRoutes()
	
		this.runServer()
	}

	private _error( message: string )
	{
		this._log.next( { level: `error`, message } )
	}

	private info( message: string )
	{
		this._log.next( { level: `info`, message } )
	}

	private setRoutes()
	{
		this.server.get( `/`, async ( request, reply ) => 
		{
			try
			{
				const response = await this.newItem( request.id )

				reply.type( `text/html` )
				
				reply.send( response )
			}
			catch ( e )
			{
				this._error( String( e ) )

				reply.status( 404 )

				reply.send()
			}
		} )

		// Routes below are not relevant outside testing
		if ( !this.isTest ) return

		this.server.head( `/ping`, ( _, reply ) => 
		{
			reply.send()
		} )
	}

	private newItem( id: string, data?: RequestData ): Promise<string>
	{
		return new Promise( ( resolve, reject ) =>
		{
			this.responses[ id ] = { resolve, reject }

			this.onRequest.next( { id, data } )
		} )
	}

	private runServer()
	{
		this.server.listen( { host: `0.0.0.0`, port: this.port }, ( err ) => 
		{
			if ( err ) throw err
		} )
	}

	public next( { data, id }: ResponseInfo )
	{
		this.responses[ id ]?.resolve( data )

		delete this.responses[ id ]
	}

	public error( error?: Error )
	{
		if ( !error || !this.isRequestError( error ) )
		{
			throw Error( error?.message )
		}

		this._error( `${error.id}: ${error.message}` )

		this.responses[ error.id ]?.reject()

		delete this.responses[ error.id ]
	}

	private isRequestError( error: Error ): error is RequestError
	{
		return `id` in error
	}

	public async destroy()
	{
		await this.server.close()
	}
}