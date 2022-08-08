import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { log } from '@graphprotocol/graph-ts'
import { store } from '@graphprotocol/graph-ts'
import {
  piNFT,
  Approval,
  ApprovalForAll,
  ReceivedERC20,
  Transfer,
  TransferERC20,
  RoyaltiesSetForTokenId
} from "../generated/piNFT/piNFT"
import { ExampleEntity } from "../generated/schema"
import { Energize } from "../generated/schema"
import { ReleaseToken } from "../generated/schema"
import { SetRoyalties, Royalities } from "../generated/schema"
export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.approved = event.params.approved

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.mintNFT(...)
  // - contract.balanceOf(...)
  // - contract.getApproved(...)
  // - contract.getRoyalties(...)
  // - contract.isApprovedForAll(...)
  // - contract.name(...)
  // - contract.ownerOf(...)
  // - contract.royaltiesByTokenId(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenURI(...)
  // - contract.viewBalance(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleReceivedERC20(event: ReceivedERC20): void {
  let entity = Energize.load(event.transaction.from.toHex())
  if (!entity) {
    entity = new Energize(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }
  entity.from = event.params._from
  entity.tokenId = event.params._tokenId
  entity.erc20Contract = event.params._erc20Contract
  entity.value = event.params._value
  entity.save()

}

// export function handleRoyaltiesSetForTokenId(
//   event: RoyaltiesSetForTokenId
// ): void {
  // let entity = SetRoyalties.load(event.transaction.from.toHex())
  // if (!entity) {
  //   entity = new SetRoyalties(event.transaction.from.toHex())
  // }
  // entity.tokenId = event.params.tokenId
  // // entity.royalties = event.params.royalties
  // let royalties = event.params.royalties;
  // let newroyalties = royalties.map( (royalty:any):any => {
  //   let newentity = new Royalities(event.transaction.from.toHex());
  //   newentity.account = royalty.account;
  //   newentity.value = royalty.value;
  //   newentity.save();
  //   return newentity;
  // })
  // entity.royalties = 
  // entity.save()
  // log.info('My value is: {}', [event.params.royalties.toString()])


// }

export function handleTransfer(event: Transfer): void {}

export function handleTransferERC20(event: TransferERC20): void {
  let entity = ReleaseToken.load(event.transaction.from.toHex())
  if (!entity) {
    entity = new ReleaseToken(event.transaction.from.toHex())
  }
  entity.tokenId = event.params._tokenId
  entity.to = event.params._to
  entity.erc20Contract = event.params._erc20Contract
  entity.value = event.params._value
  entity.save()
}
