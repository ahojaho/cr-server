const ByteBuffer = require('../../../services/network/bytebuffer-sc')
const cards = require('../../../logic/cards')
const tag2id = require('../../../logic/utils/tag2id')

module.exports.code = 24113

module.exports.encode = user => {
    let buffer = ByteBuffer.allocate(2000)

    buffer.writeRrsInt32(0)
    buffer.writeRrsInt32(0)
    buffer.writeRrsInt32(0)

    // DECK
    for (let i = 0; i <= 7; i++) {
        buffer.writeRrsInt32(user.decks[0][i]) // CARD ID
        buffer.writeRrsInt32(user.cards[user.decks[0][i]][0]) // LEVEL
        buffer.writeRrsInt32(0)
        buffer.writeRrsInt32(user.cards[user.decks[0][i]][1]) // COUNT
        buffer.writeRrsInt32(0)
        buffer.writeRrsInt32(0)
        buffer.writeRrsInt32(0)
        buffer.writeRrsInt32(0)
      }

    buffer.writeInt32(user.id.high)
    buffer.writeInt32(user.id.low)

    buffer.writeByte(0) // IF 1 => C. (RRSINT-RRSINT)

    buffer.writeRrsInt32(0) // SEASONS COUNT
    /* SEASONS COMPONENT */

    buffer.writeByte(0)

    for (let i = 0; i < 3; i++) {
        buffer.writeRrsInt32(user.id.high)
        buffer.writeRrsInt32(user.id.low)
    }

    buffer.writeIString(user.nick)
    buffer.writeByte(0) // NAME CHANGED

    buffer.writeRrsInt32(user.arena + 1)
    buffer.writeRrsInt32(user.trophies)
    buffer.writeRrsInt32(235) // UNKNOWN
    buffer.writeRrsInt32(2380)
    buffer.writeRrsInt32(0) // LEGEND TROPHIES
    buffer.writeRrsInt32(0) // SEASON RECORD
    buffer.writeRrsInt32(0)
    buffer.writeRrsInt32(0) // BEST SEASON RANK
    buffer.writeRrsInt32(0) // BEST SEASON TROPHIES

    buffer.writeByte(0)
    buffer.writeByte(37)

    buffer.writeRrsInt32(0) // PREVIOUS SEASON RANK
    buffer.writeRrsInt32(0) // PREVIOUS SEASON TROPHIES
    buffer.writeRrsInt32(0) // PREVIOUS SEASON RECORD

    buffer.writeRrsInt32(0)
    buffer.writeByte(0)
    buffer.writeByte(8)

    buffer.writeRrsInt32(16) // COMPONENT LENGTH

    buffer.writeByte(5)
    buffer.writeByte(1)
    buffer.writeRrsInt32(user.gold)

    buffer.writeByte(5)
    buffer.writeByte(2)
    buffer.writeRrsInt32(150) // WON CHESTS

    buffer.writeByte(5)
    buffer.writeByte(3)
    buffer.writeRrsInt32(0)

    buffer.writeByte(5)
    buffer.writeByte(4)
    buffer.writeRrsInt32(0)

    buffer.writeByte(5)
    buffer.writeByte(5)
    buffer.writeRrsInt32(user.gold)

    buffer.writeByte(5)
    buffer.writeByte(12)
    buffer.writeRrsInt32(419) // NEXT SUPERMAGICAL

    buffer.writeByte(5)
    buffer.writeByte(13)
    buffer.writeRrsInt32(0)

    buffer.writeByte(5)
    buffer.writeByte(14)
    buffer.writeRrsInt32(0) // DAILY REWARDS

    buffer.writeByte(5)
    buffer.writeByte(15)
    buffer.writeRrsInt32(0) // NEXT LEGENDARY

    buffer.writeByte(5)
    buffer.writeByte(16)
    buffer.writeRrsInt32(1040) // SHOP DAYS

    buffer.writeByte(5)
    buffer.writeByte(17)
    buffer.writeRrsInt32(1044) // SHOP LEGENDARY

    buffer.writeByte(5)
    buffer.writeByte(18)
    buffer.writeRrsInt32(1043) // SHOP SM

    buffer.writeByte(5)
    buffer.writeByte(19)
    buffer.writeRrsInt32(1049) // SHOP ARENA PACK

    buffer.writeByte(5)
    buffer.writeByte(22)
    buffer.writeRrsInt32(1042) // SHOP EPIC

    buffer.writeByte(5)
    buffer.writeByte(28)
    buffer.writeByte(0)

    buffer.writeByte(5)
    buffer.writeByte(29)
    buffer.writeByte(72000006) // LAST GAME MODE

    buffer.writeByte(00)
    buffer.writeRrsInt32(0) // C. LENGTH (BYTE-BYTE-RRSINT32)
    buffer.writeRrsInt32(0) // C. LENGTH (BYTE-BYTE-RRSINT32)

    buffer.writeRrsInt32(9) // C. LENGTH

    buffer.writeByte(5)
    buffer.writeByte(6)
    buffer.writeRrsInt32(user.record) // U. Record

    buffer.writeByte(5)
    buffer.writeByte(7)
    buffer.writeRrsInt32(125) // 3 Crown Wins

    buffer.writeByte(5)
    buffer.writeByte(8)
    buffer.writeRrsInt32(Object.keys(user.cards).length)

    buffer.writeByte(5)
    buffer.writeByte(9)
    buffer.writeRrsInt32(cards.id[1].scid) // FAVOURITE CARD

    buffer.writeByte(5)
    buffer.writeByte(10)
    buffer.writeRrsInt32(5000) // DONATIONS

    buffer.writeByte(5)
    buffer.writeByte(11)
    buffer.writeRrsInt32(10)

    buffer.writeByte(5)
    buffer.writeByte(20)
    buffer.writeRrsInt32(6) // SURVIVAL MAX WINS

    buffer.writeByte(5)
    buffer.writeByte(21)
    buffer.writeRrsInt32(142)

    buffer.writeByte(5)
    buffer.writeByte(27)
    buffer.writeRrsInt32(8) // MAX ARENA

    buffer.writeRrsInt32(0) // C.LENGTH - CARDS (3x RRSINT32)
    buffer.writeByte(0) // IF 1 => C. (RRSINT-BYTE-BYTE)
    buffer.writeByte(0)

    buffer.writeRrsInt32(user.gems)
    buffer.writeRrsInt32(user.gems)
    buffer.writeRrsInt32(user.experience)
    buffer.writeRrsInt32(user.level)
    buffer.writeRrsInt32(0)

    buffer.writeByte(user.clan ? 9 : 1) // HAS CLAN ? 9 : Yes, 1: No
    if (user.clan) {
        let tag = tag2id.tag2id(user.clan[1])
        buffer.writeRrsInt32(tag.high)
        buffer.writeRrsInt32(tag.low) // CLAN ID
        buffer.writeIString(user.clan[0]) //CLAN NAME
        buffer.writeRrsInt32(user.clan[2]) // CLAN BADGE
        buffer.writeByte(2) // PLAYER ROLE
    }


    buffer.writeRrsInt32(342) // BATTLES PLAYED
    buffer.writeRrsInt32(0) // TOURNEY BATTLES PLAYED
    buffer.writeRrsInt32(0)

    buffer.writeRrsInt32(193) // WINS
    buffer.writeRrsInt32(128) // LOSES
    buffer.append('00', 'hex')

    return buffer.buffer.slice(0, buffer.offset)
}