import * as dotenv from 'dotenv';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

dotenv.config();

const deployFunc: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const transferAgent = await deploy('TransferAgent', {
        from: deployer,
        log: true
    });
	await hre.run('verify:verify', { address: transferAgent.address });
};

deployFunc.tags = ['TransferAgent'];
export default deployFunc;
