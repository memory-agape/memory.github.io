import { MahjongOption, Yaku } from "../@types/types";
import { PaiPairCollection } from "../Collection/Collection";
import { PaiGenerator } from "../Utilities/PaiGenerator";

export class JunChanta implements Yaku {
  private paiPairCollection: PaiPairCollection

  constructor(paiPairCollection: PaiPairCollection, _: MahjongOption) {
    this.paiPairCollection = paiPairCollection
  }

  get type(): Yaku['type'] {
    return 'NORMAL'
  }

  get han(): number {
    return this.paiPairCollection.hasFuro
      ? 2
      : 3
  }

  get isFulfilled(): boolean {
    const result: boolean[] = []
    const allowedPatterns = PaiGenerator.generatePenchanHai();

    for (const paiPair of this.paiPairCollection.paiPairs) {
      result.push(
        allowedPatterns.includes(paiPair.pattern)
      )
    }
    return result.every(v => v)
  }
}
