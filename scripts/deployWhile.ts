import { toNano } from 'ton-core';
import { awesome } from '../wrappers/While';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const eeee = provider.open(
        await awesome
            .fromInit
            // BigInt(Math.floor(Math.random() * 10000))));
            ()
    );

    await eeee.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(eeee.address);

    console.log('Counter', await eeee.getCounter());
}
