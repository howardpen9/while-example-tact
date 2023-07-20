import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { awesome } from '../wrappers/While';
import '@ton-community/test-utils';

describe('While', () => {
    let blockchain: Blockchain;
    let eeee: SandboxContract<awesome>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        eeee = blockchain.openContract(await awesome.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await eeee.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            'Add'
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: eeee.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and while are ready to use
    });

    it('should increase counter', async () => {
        const increaseTimes = 1;

        console.log(`increase ${1}/${increaseTimes}`);

        const increaser = await blockchain.treasury('increaser' + 1);

        const counterBefore = await eeee.getCounter();
        console.log('counter before increasing', counterBefore);

        // const increaseBy = BigInt(Math.floor(Math.random() * 100));
        // console.log('increasing by', increaseBy);

        const increaseResult = await eeee.send(
            increaser.getSender(),
            {
                value: toNano('0.05'),
            },
            'Add'
        );

        expect(increaseResult.transactions).toHaveTransaction({
            from: increaser.address,
            to: eeee.address,
            success: true,
        });

        const counterAfter = await eeee.getCounter();
        console.log('counter after increasing', counterAfter);

        expect(counterAfter).toBe(2n);
    });
});
