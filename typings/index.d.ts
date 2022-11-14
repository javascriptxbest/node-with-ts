interface LoggingObservable
{
	readonly onLog: {
		subscribe(logObserver: Observer<Log>): void
	}
}

type LogLevel = `info` | `warn` | `error`

interface Log
{
	level: LogLevel
	message: string
}

type RequestData = Record<string, string>

interface RequestInfo
{
	id: string
	data?: RequestData
}

interface WorkerRequestInfo
{
	id: string
	data?: RequestData
}

interface WorkerResposeMessage
{
	id: string
	data: string
}

interface RequestObservable
{
	readonly onRequest: {
		subscribe(requestObserver: Observer<RequestInfo>): void
	}
}

interface ResponseInfo
{
	id: string
	data: string
}

interface ResponseObservable
{
	readonly onResponse: {
		subscribe(responseObserver: Observer<ResponseInfo>): void
	}
}

interface Observer<T>
{
	next?: (data: T) => void
	completed?: () => void
	error?: (error?: Error) => void
}

type Query = Record<string, string | string[]>

interface RequestError extends Error
{
	id: string
}