import { readdir } from "fs/promises"

export async function getDirectories( source: string )
{
	return ( await readdir( source, { withFileTypes: true } ) )
		.filter( dirent => dirent.isDirectory() )
		.map( dirent => dirent.name )
}

export async function getFiles( source: string )
{
	return ( await readdir( source, { withFileTypes: true } ) )
		.filter( dirent => dirent.isFile() )
		.map( dirent => dirent.name )
}
