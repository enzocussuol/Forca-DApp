const hre = require("hardhat");

async function main() {
  const ForcaCoin = await hre.ethers.getContractFactory("ForcaCoin");
  const forcaCoin = await ForcaCoin.deploy();
  await forcaCoin.deployed();
  console.log("forcaCoin deployed to: ", forcaCoin.address);

  const FabricaJogo = await hre.ethers.getContractFactory("FabricaJogo");
  const fabricaJogo = await FabricaJogo.deploy();
  await fabricaJogo.deployed();
  console.log("fabricaJogo deployed to: ", fabricaJogo.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })