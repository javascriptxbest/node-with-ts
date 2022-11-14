import { Core } from "./core"

/**
 * Main class provide instantiation and API
 * to extenal contexts
 */
export class Main
{
	private core: Core

	constructor( logLocation?: string )
	{
		this.core = new Core( logLocation )
	}

	public async init()
	{
		await this.core.init()
	}

	public async doThing()
	{
		return await this.core.doThing()
	}
}