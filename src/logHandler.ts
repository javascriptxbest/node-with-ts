import { SubscriberHandler } from './subscriberHandler'

export enum LogLevel
{
	error = `error`,
	warn = `warn`,
	info = `info`
}

export class LogHandler implements LoggingObservable
{
	public readonly onLog: SubscriberHandler<Log>

	constructor()
	{
		this.onLog = new SubscriberHandler()
	}

	public log( level: LogLevel, message: string )
	{
		this.onLog.next( { level, message } )
	}
}