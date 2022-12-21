# Messaging guidelines (utkast)

## Transactional outbox
Consider using a pattern like the transactional outbox to ensure consistency between databases and sent events.
https://microservices.io/patterns/data/transactional-outbox.html
If we want to use this mechanism all-over, we can benefit from sharing implementation specifics.

Tip: In a DDD-oriented setting, each aggregate root can hold a list of events. If persistence is relational and handled through ef-core, 
override SaveChanges to save events in a separate table.
Tip: Using a polling mechanism to relay messages from relational storage to service-bus can be ok, but not optimal, since events won't be picked up until next polling. To not poll to often, some
backoff mechanism is usually employed, which might push back next polling to a, in most cases, inapropriate amount of time, say 30 seconds.
Therefore, some notification-system is preferred.
An idea is to send an extra (not transactionally bound) event on the servicebus, with semantics like "new-events-exists" when new events are saved to relational storage. A relay-service listening at
this event can then react by picking up events from relational storage. Since the "new events-exists"-event is not transactionally bound, it can be sent by mistake
or it can fail to be sent. This is OK! These events will be picked up later, either by the handling of the next succesfully sent "new events-exists"-event or by a backup polling mechanism.

## Message semantics
Consider deciding on each message if is a command, or an event, to clearly express its intent. 
A command message type is usually defined by the sole receiver. An event type is defined by its sender, and can be consumed by multiple receivers.

## Events granularity: Domain events vs "data events", and thin vs fat events
When defining an event, it can be named in at least one of two different ways. Consider updating an order with adding a new order row. You could publish either
 - Fat: CustomerUpdated, or
 - Thin: CustomerEmailUpdated and CustomerTerminated

The first (fat) event is more general, can be sent on multiple occasions, and must contain information about how the order was updated, or rely on the receiver to be able to figure it out itself. Adding data to the event itself could be equated with the overfetching problem in synchronous apis. The receiver might not need all this information. However, reducing the amount of information to only accomodate current consumers, is giving the consumer to much influence of what the event looks like (remember, events are defined and owned by their senders). This will create coupling between senders and receivers. Also, problem arises when receivers have different access-level to data fields exposed by the event. Maybe fat events are more appropriate when "replicating data"? Consider the situation when you're building a search database.

The second (thin) events are more specific and in both cases must only contain the CustomerId. The receiver will then typically query the publishing service for more information, if needed. Even though it might sound ineffective to sometimes accompany the receivment of a message with a follow-up query, I think the pros outweighs the cons here. 
- Domain events in themselves, rarely change, because 1, they contain a minimum set of data, and 2, domain rarely change. 
- The Event will not contain any sensitive data. Access control can then be performed only on follow-up queries.
- No need for another serialized model of data. The serialized model is retrieved using the synchronous api.
- Also, I think the impact of the follow-up query can sometimes be remedied by pre-caching. "Since we're sending out a certain event, we can expect queries on the related data.")

## Sharing message definitions
The receiver and sender of a message, be it a command or event, must agree on the event format. In a mono-repo setting, and with a common programming language, sharing definitions is easy. Just reference them. Published packages are also an alternative if code language is shared. Otherwise, some other way of communicating message format is required. Just like open-api, there is something
called asyncapi. Look it up: https://www.asyncapi.com/. AsyncApi and code generators can probably act as bridge between programming languages.

## Message versioning

A message format can be updated without publishing it as a new version, as long as it is backwards compatible. Backwards compatible changes include at least:
- added fields on events
- nullable parameters on commands
Non-backwards compatible changes include at least:
- removing fields on events
- changing semantics of existing fields
- changing the circumstances under which an event is produced
- adding required parameters on commands
Backwards compatible changes can be deployed AT ANY TIME.

If changes aren't backwards compatible, a new type of event must be defined. (a new incompatible version of an event, is strictly speaking the same thing as a new event type.)
To be able to deploy this change, without requiring waiting for queues emptying and lock-step release with consuming code, consider double-pushing. That is,
deprecate the old event, but continue sending it. Also send the new event. Consumers can then be informed about the deprecated event, and update consuming code at their next release.
After a while, all events of the old type have been consumed, and all consumers have been updated to use the new event. The old event can now be removed from source code altogether.

By using double-pushing, a breaking change might actually be possible to deploy as a series of non-breaking changes.

## Idempotent message receivers
A receiver might always crash at an inappropriate time. To make message handling robust, implement Effectively Once processing. That is, make the receiving code idempotent. If it receives the 
same message multiple times, additive effects won't occur. This can be implemented using a message id, stored in the receivers database in the same transaction as other event-related changes. You can then deduplicate incoming events by consulting the index of already handled message ids. Some message types won't need an "idempotency id". Some operations are intrinsically idempotent. Imagine the handling of the event "CustomerNameChanged". Receiving this event multiple times is not a problem.

## Correlation Ids
The ability to see which user action triggers what events, and what new events these events triggered, we should consider letting all events carry some correlation id. Logging should always include this correlation id. Querying the logs for a specific correlation id will give you a good overview of the interactions over the whole system. We need to discuss what would happen when an event triggers branching into multiple new events. The log might be unusable if you can't follow just one of the branches?
Correlation ids should also be used when using synchronous apis. A custom http-header can be used for this.



# My preferences
If I decided myself, with my current knowledge, these are the decisions I'd make.
1. Use a monorepo
2. Use the same programming language
3. Share an implementation of the transactional outbox and its related relay-service
4. Differ between commands and events
6. Publish thin events
7. Make new versions of events backwards compatible if possible
8. Non-backwards-compatible-events are semantically equivalent to new events
9. Use double-pushing, and share implementation to do so
10. If possible, make breaking changes to a message through a series of non-breaking-changes. 
11. Maintain a list of event consumers. Consult them before deprecated events can be removed.
12. Make receivers idempotent. If you have to, use the message id as an idempotency id. 
13. Share implementation to de-duplicate messages using idempotency id.
14. Always forward a correlation id. Share code to handle correlation ids.