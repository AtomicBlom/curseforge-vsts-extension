// Example from CurseForge API
// {
//     changelog: "A string describing changes.", // Can be HTML or markdown if changelogType is set.
//     changelogType: ["text", "html", "markdown"], // Optional: defaults to text
//     displayName: "Foo", // Optional: A friendly display name used on the site if provided.
//     parentFileID: 42, // Optional: The parent file of this file.
//     gameVersions: [157, 158], // A list of supported game versions, see the Game Versions API for details. Not supported if parentFileID is provided.
//     releaseType: "alpha", // One of "alpha", "beta", "release".
//     relations: {
//         projects: [{
//             slug: "mantle", // Slug of related plugin.
//             type: ["embeddedLibrary", "incompatible", "optionalDependency", "requiredDependency", "tool"] // Choose one
//         }]
//     } // Optional: An array of project relations by slug and type of dependency for inclusion in your project.
// }

export interface IProjectUpload {
    changelog: string;
    changelogType?: "text" | "html" | "markdown";
    displayName?: string;
    parentFileID?: number;
    gameVersions?: number[];
    releaseType: "alpha" | "beta" | "release"
    relations?: {
        projects: IProjectReference[];
    } 
}

export interface IProjectReference {
    slug: string;
    type: "embeddedLibrary" | "incompatible" | "optionalDependency" | "requiredDependency" | "tool"
}