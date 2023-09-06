import { component$, useComputed$, useSignal, $ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { type Bank, bankList } from "./zengin";

export const useBankList = routeLoader$(() => {
  return bankList;
});

export default component$(() => {
  const list = useBankList();
  const searchWord = useSignal("");
  const selectedBank = useSignal<Bank>();
  const filteredList = useComputed$(() => {
    if (!searchWord.value) {
      return list.value;
    }
    const search = searchWord.value.toLowerCase();
    return list.value.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.kana.toLowerCase().includes(search) ||
        item.hira.toLowerCase().includes(search) ||
        item.roma.toLowerCase().includes(search)
    );
  });

  const onClick = $((item: Bank) => {
    selectedBank.value = item;
  });

  return (
    <>
      <div class="container container-center">
        <h1>
          <span class="highlight">銀行</span> 検索
        </h1>
      </div>
      <div role="presentation" class="ellipsis"></div>
      <div class="container container-center">
        <input type="text" bind:value={searchWord} placeholder="銀行名を入力" />
      </div>
      <div role="presentation" class="ellipsis"></div>
      <div class="container container-center">
        {/* 選択された銀行名と銀行コード */}
        <div>
          <span>銀行名: </span>
          <span>{selectedBank.value?.name}</span>
        </div>
        <div>
          <span>銀行コード: </span>
          <span>{selectedBank.value?.code}</span>
        </div>
      </div>
      <div class="container container-center">
        <h1>
          <span class="highlight">銀行</span> 一覧
        </h1>
      </div>
      <div role="presentation" class="ellipsis"></div>
      <div class="container container-center">
        <ul>
          {filteredList.value.map((item, index) => (
            <li key={`items-${index}`} onClick$={() => onClick(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});
