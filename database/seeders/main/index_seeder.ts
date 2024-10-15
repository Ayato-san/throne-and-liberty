import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    // if (
    //   !Seeder.default.environment ||
    //   (!Seeder.default.environment.includes('development') && app.inDev) ||
    //   (!Seeder.default.environment.includes('testing') && app.inTest) ||
    //   (!Seeder.default.environment.includes('production') && app.inProduction)
    // ) {
    //   return
    // }

    await new Seeder.default(this.client).run()
  }

  async run() {
    /** Loot Seeders */
    await this.seed(await import('#database/seeders/location_category_seeder'))
    await this.seed(await import('#database/seeders/location_seeder'))
    await this.seed(await import('#database/seeders/mob_seeder'))

    /** Item Seeders */
    await this.seed(await import('#database/seeders/item_tier_seeder'))
    await this.seed(await import('#database/seeders/item_category_seeder'))
    await this.seed(await import('#database/seeders/item_seeder'))

    /** Weapon Seeders */
    await this.seed(await import('#database/seeders/weapon_seeder'))
    await this.seed(await import('#database/seeders/weapon_association_seeder'))

    /** Build Seeders */
    await this.seed(await import('#database/seeders/build_seeder'))
  }
}
