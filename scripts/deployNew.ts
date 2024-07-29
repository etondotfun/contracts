import { toNano } from '@ton/core';
import { New } from '../wrappers/New';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const new = provider.open(await New.fromInit());

    await new.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(new.address);

    // run methods on `new`
}
