##https://radicle.xyz/guides/seeder 
rad auth # from inside of docker container

$ rad auth 

Initializing your radicle 👾 identity

✓ Enter your alias: fi5h
✓ Enter a passphrase: ********
✓ Creating your Ed25519 keypair...
✓ Your Radicle DID is did:key:z6MktUKj28u6YXfUospXmtXrsygcbvZFFmPmWZv88hREVKn7. This identifies your device. Run `rad self` to show it at all times.
✓ You're all set.

✗ Hint: install ssh-agent to have it fill in your passphrase for you when signing.

To create a Radicle repository, run `rad init` from a Git repository with at least one commit.
To clone a repository, run `rad clone <rid>`. For example, `rad clone rad:z3gqcJUoA1n9HaHKufZs5FCSGazv5` clones the Radicle 'heartwood' repository.
To get a list of all commands, run `rad`.
$ rad
rad pre-release (c6076196)
Radicle command line interface

Usage: rad <command> [--help]
Common `rad` commands used in various situations:

        auth         Manage identities and profiles
        block        Block repositories or nodes from being seeded or followed
        checkout     Checkout a repository into the local directory
        clone        Clone a Radicle repository
        config       Manage your local Radicle configuration
        fork         Create a fork of a repository
        help         CLI help
        id           Manage repository identities
        init         Initialize a Radicle repository
        inbox        Manage your Radicle notifications
        inspect      Inspect a Radicle repository
        issue        Manage issues
        ls           List repositories
        node         Control and query the Radicle Node
        patch        Manage patches
        path         Display the Radicle home path
        clean        Remove all remotes from a repository
        self         Show information about your identity and device
        seed         Manage repository seeding policies
        follow       Manage node follow policies
        unfollow     Unfollow a peer
        unseed       Remove repository seeding policies
        remote       Manage a repository's remotes
        stats        Displays aggregated repository and node metrics
        sync         Sync repositories to the network

See `rad <command> --help` to learn about a specific command.

$ rad node start # docker exec -it radicle rad node
