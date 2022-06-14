<template>
  <v-card data-cy="collection-graves-card">
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Graves</v-toolbar-title>
      <v-spacer />
      <navigation-create-resource-button
        v-if="$auth.hasScope('ROLE_EDITOR')"
        :parent="parent"
        :resource-name="resourceName"
        :disabled="false"
      />
    </v-toolbar>
    <v-data-table
      height="100%"
      fixed-header
      multi-sort
      :items-per-page="10"
      :footer-props="{
        disableItemsPerPage: true
      }"
      dense
      :headers="[
      {
        text: 'id',
        value: 'id',
        align: 'center fixed',
        width: '150px'
      },
      {
        text: 'site',
        value: 'site.code',
        align: 'center',
        width: '100px'
      },
      {
        text: 'area',
        value: 'area.code',
        align: 'center',
        width: '100px'
      },
      {
        text: 'year',
        value: 'year',
        width: '100px'
      },
      {
        text: 'number',
        value: 'number',
        width: '100px'
      },
      {
        text: 'building',
        value: 'building',
        width: '100px'
      },
      {
        text: 'room',
        value: 'room',
        width: '100px'
      },
      {
        text: 'phase',
        value: 'phase',
        width: '100px'
      },
      {
        text: 'period',
        value: 'period.code',
        width: '100px'
      },
      {
        text: 'type',
        value: 'type.value',
        width: '100px'
      },
      {
        text: 'preservation',
        value: 'preservationState.value',
        width: '130px'
      },
      {
        text: 'cut SU',
        value: 'cutStratigraphicUnit',
        width: '170px'
      },
      {
        text: 'fill SU',
        value: 'fillStratigraphicUnit',
        width: '170px'
      },
      {
        text: 'skel. SU',
        value: 'skeletonStratigraphicUnit',
        width: '170px'
      },
      {
        text: 'earlier than',
        value: 'earlierThan',
        width: '170px'
      },
      {
        text: 'later than',
        value: 'laterThan',
        width: '170px'
      },
      {
        text: 'supervisor',
        value: 'areaSupervisor',
        width: '120px'
      },
      {
        text: 'compiler',
        value: 'compiler',
        width: '200px'
      },
      {
        text: 'summary',
        value: 'summary',
        width: '200px'
      },
      {
        text: 'description',
        value: 'description',
        width: '200px'
      },
      {
        text: 'interpretation',
        value: 'interpretation',
        width: '200px'
      },
      {
        text: 'date',
        value: 'date',
        width: '100px'
      }
    ]"
      :items="items"
      :options.sync="pagination"
      :server-items-length="totalItems"
    >
      <template #[`item.id`]="{ item : tItem }">
        <navigation-resource-item-crud
          scope="ROLE_EDITOR"
          :item-id="tItem.id"
          :resource-name="resourceName"
          @delete="openDeleteDialog(tItem)"
        >
          <div class="secondary--text">{{formatCode(resourceName, tItem)}}</div>
        </navigation-resource-item-crud>
      </template>
      <template #[`item.site.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.site.code"
          :item-id="item.site.id"
          resource-name="site" />
      </template>
      <template #[`item.area.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.area.code"
          :item-id="item.area.id"
          resource-name="area"
        />
      </template>
      <template #[`item.cutStratigraphicUnit`]="{ item }">
        <navigation-resource-item-chip
          v-if="item.cutStratigraphicUnit"
          :link-text="formatCode('stratigraphicUnit', item.cutStratigraphicUnit)"
          :item-id="item.cutStratigraphicUnit.id"
          resource-name="stratigraphicUnit"
        />
      </template>
      <template #[`item.fillStratigraphicUnit`]="{ item }">
        <navigation-resource-item-chip
          v-if="item.fillStratigraphicUnit"
          :link-text="formatCode('stratigraphicUnit', item.fillStratigraphicUnit)"
          :item-id="item.fillStratigraphicUnit.id"
          resource-name="stratigraphicUnit"
        />
      </template>
      <template #[`item.skeletonStratigraphicUnit`]="{ item }">
        <navigation-resource-item-chip
          v-if="item.skeletonStratigraphicUnit"
          :link-text="formatCode('stratigraphicUnit', item.skeletonStratigraphicUnit)"
          :item-id="item.skeletonStratigraphicUnit.id"
          resource-name="stratigraphicUnit"
        />
      </template>
      <template #[`item.earlierThan`]="{ item }">
        <navigation-resource-item-chip
          v-if="item.earlierThan"
          :link-text="formatCode('stratigraphicUnit', item.earlierThan)"
          :item-id="item.earlierThan.id"
          resource-name="stratigraphicUnit"
        />
      </template>
      <template #[`item.laterThan`]="{ item }">
        <navigation-resource-item-chip
          v-if="item.laterThan"
          :link-text="formatCode('stratigraphicUnit', item.laterThan)"
          :item-id="item.laterThan.id"
          resource-name="stratigraphicUnit"
        />
      </template>
      <template #[`item.date`]="{ item }">
        {{ new Date(item.date).toLocaleDateString() }}
      </template>
      <template #[`item.description`]="{ item }">
        <long-text-table-data-tooltip :text="item.description" />
      </template>
      <template #[`item.summary`]="{ item }">
        <long-text-table-data-tooltip :text="item.summary" />
      </template>
      <template #[`item.interpretation`]="{ item }">
        <long-text-table-data-tooltip :text="item.interpretation" />
      </template>
    </v-data-table>
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndFetch"
    >
      <lazy-delete-grave-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "CollectionGravesCard",
  mixins: [
    ResourceDeleteDialogMixin,
    ResourceCollectionGetMixin,
    ResourceItemDataAccessorMixin
  ],
}
</script>

<style scoped>

</style>
