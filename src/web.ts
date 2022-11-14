import { Server } from "./server"
import { isMainThread, parentPort } from "worker_threads"
import { Main } from "."
import { RequestErrorType } from "./requestError"

const { PORT, LOG, TEST } = process.env

if ( !PORT )
{
	throw Error( `Please set PORT number for the server` )
}

const port = parseInt( PORT )

const isTest = !!TEST

const main = isMainThread ? new Main( LOG ) : undefined

const server = new Server( port, isTest, LOG )

const signals = [ `SIGTERM`, `SIGINT`, `SIGQUIT`, `SIGTSTP` ]

signals.forEach( sig =>
{
	process.on( sig, async () =>
	{
		await server.destroy()

		process.exit( 0 )
	} )
} )

if ( !isMainThread )
{
	parentPort?.on( `message`, ( { id, data }: WorkerResposeMessage ) =>
		server.next( { id, data } ) )
}
else
{
	main?.init()
}

server.onRequest.subscribe( {
	next: ( { id, data } ) =>
	{
		if ( !isMainThread )
		{
			parentPort?.postMessage( { id, data } )
		}
		else
		{
			if ( !main ) throw `No request handler`

			main.doThing()
				.then( response => server.next( { id, data: response } ) )
				.catch( ( error ) => server.error( new RequestErrorType( id, error ) ) )
		}
	}
} )
