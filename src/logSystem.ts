import type { FastifyLoggerStreamDestination } from 'fastify/types/logger'
import pino from 'pino'

export class LogSystem implements Observer<Log>
{
	private logger: pino.Logger

	private genericLUT: Record<LogLevel, ( message: string ) => void>

	private dest: FastifyLoggerStreamDestination

	constructor( logLocation?: string )
	{
		const _dest = logLocation
			? pino.destination( { dest: logLocation, sync: false } )
			: pino.transport( { target: `pino-pretty` } )

		this.dest = _dest

		this.logger = pino( _dest )

		this.genericLUT = {
			error: message => this.logger.error( message ),
			warn: message => this.logger.warn( message ),
			info: message => this.logger.info( message )
		}
	}

	get logDestination()
	{
		return this.dest
	}
	
	public next( data: Log ): void
	{
		this.genericLUT[ data.level ]( data.message )
	}
	
	public completed(): void
	{
		// ...
	}
}